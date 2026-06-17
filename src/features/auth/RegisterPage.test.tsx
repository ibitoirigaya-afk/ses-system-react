import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import RegisterPage from "./RegisterPage";

describe("RegisterPage", () => {
	test("必要項目を入力して登録するとonRegisterが呼ばれる", async () => {
		const user = userEvent.setup();
		const onRegister = vi.fn().mockResolvedValue(true);
		const onBackToLogin = vi.fn();

		render(
			<RegisterPage onRegister={onRegister} onBackToLogin={onBackToLogin} />,
		);

		await user.type(screen.getByPlaceholderText("例：山田 太郎"), "山田 太郎");
		await user.type(
			screen.getByPlaceholderText("例：yamada@example.com"),
			"yamada@example.com",
		);
		await user.type(screen.getByPlaceholderText("4文字以上で入力"), "password");
		await user.type(
			screen.getByPlaceholderText("もう一度パスワードを入力"),
			"password",
		);
		await user.selectOptions(screen.getByRole("combobox"), "company");

		await user.click(screen.getByRole("button", { name: "登録する" }));

		expect(onRegister).toHaveBeenCalledTimes(1);
		expect(onRegister).toHaveBeenCalledWith({
			name: "山田 太郎",
			email: "yamada@example.com",
			password: "password",
			passwordConfirm: "password",
			role: "company",
		});
	});

	test("パスワードと確認用パスワードが違う場合はonRegisterが呼ばれない", async () => {
		const user = userEvent.setup();
		const onRegister = vi.fn().mockResolvedValue(true);
		const onBackToLogin = vi.fn();
		const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

		render(
			<RegisterPage onRegister={onRegister} onBackToLogin={onBackToLogin} />,
		);

		await user.type(screen.getByPlaceholderText("例：山田 太郎"), "山田 太郎");
		await user.type(
			screen.getByPlaceholderText("例：yamada@example.com"),
			"yamada@example.com",
		);
		await user.type(screen.getByPlaceholderText("4文字以上で入力"), "password");
		await user.type(
			screen.getByPlaceholderText("もう一度パスワードを入力"),
			"pass",
		);

		await user.click(screen.getByRole("button", { name: "登録する" }));

		expect(onRegister).not.toHaveBeenCalled();
		expect(alertMock).toHaveBeenCalledWith(
			"パスワードと確認用パスワードが一致しません。",
		);

		alertMock.mockRestore();
	});

	test("ログイン画面へ戻るを押すとonBackToLoginが呼ばれる", async () => {
		const user = userEvent.setup();
		const onRegister = vi.fn().mockResolvedValue(true);
		const onBackToLogin = vi.fn();

		render(
			<RegisterPage onRegister={onRegister} onBackToLogin={onBackToLogin} />,
		);

		await user.click(
			screen.getByRole("button", { name: "ログイン画面へ戻る" }),
		);

		expect(onBackToLogin).toHaveBeenCalledTimes(1);
	});
});
