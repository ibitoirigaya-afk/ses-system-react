import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import LoginPage from "./LoginPage";

describe("LoginPage", () => {
	test("メールアドレスとパスワードを入力してログインできる", async () => {
		const user = userEvent.setup();
		const onLogin = vi.fn().mockResolvedValue(true);
		const onChangeToRegister = vi.fn();

		render(
			<LoginPage onLogin={onLogin} onChangeToRegister={onChangeToRegister} />,
		);

		await user.type(
			screen.getByPlaceholderText("例：admin@example.com"),
			"admin@example.com",
		);
		await user.type(screen.getByPlaceholderText("例：password"), "password");

		await user.click(screen.getByRole("button", { name: "ログイン" }));

		expect(onLogin).toHaveBeenCalledTimes(1);
		expect(onLogin).toHaveBeenCalledWith("admin@example.com", "password");
	});

	test("新規登録はこちらを押すとonChangeToRegisterが呼ばれる", async () => {
		const user = userEvent.setup();
		const onLogin = vi.fn().mockResolvedValue(true);
		const onChangeToRegister = vi.fn();

		render(
			<LoginPage onLogin={onLogin} onChangeToRegister={onChangeToRegister} />,
		);

		await user.click(screen.getByRole("button", { name: "新規登録はこちら" }));

		expect(onChangeToRegister).toHaveBeenCalledTimes(1);
	});

	test("メールアドレス未入力の場合はonLoginが呼ばれない", async () => {
		const user = userEvent.setup();
		const onLogin = vi.fn().mockResolvedValue(true);
		const onChangeToRegister = vi.fn();
		const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

		render(
			<LoginPage onLogin={onLogin} onChangeToRegister={onChangeToRegister} />,
		);

		await user.type(screen.getByPlaceholderText("例：password"), "password");
		await user.click(screen.getByRole("button", { name: "ログイン" }));

		expect(onLogin).not.toHaveBeenCalled();
		expect(alertMock).toHaveBeenCalledWith(
			"メールアドレスを入力してください。",
		);

		alertMock.mockRestore();
	});

	test("パスワード未入力の場合はonLoginが呼ばれない", async () => {
		const user = userEvent.setup();
		const onLogin = vi.fn().mockResolvedValue(true);
		const onChangeToRegister = vi.fn();
		const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

		render(
			<LoginPage onLogin={onLogin} onChangeToRegister={onChangeToRegister} />,
		);

		await user.type(
			screen.getByPlaceholderText("例：admin@example.com"),
			"admin@example.com",
		);
		await user.click(screen.getByRole("button", { name: "ログイン" }));

		expect(onLogin).not.toHaveBeenCalled();
		expect(alertMock).toHaveBeenCalledWith("パスワードを入力してください。");

		alertMock.mockRestore();
	});
});
