import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import SkillForm from "./SkillForm";

describe("SkillForm", () => {
	test("スキル名とカテゴリを入力して送信するとonSubmitが呼ばれる", async () => {
		const user = userEvent.setup();
		const onSubmit = vi.fn();
		const onCancel = vi.fn();

		render(
			<SkillForm
				onSubmit={onSubmit}
				onCancel={onCancel}
				submitLabel="登録する"
			/>,
		);

		await user.type(screen.getByPlaceholderText("例：React"), "React");
		await user.type(
			screen.getByPlaceholderText("例：フロントエンド"),
			"フロントエンド",
		);

		await user.click(screen.getByRole("button", { name: "登録する" }));

		expect(onSubmit).toHaveBeenCalledTimes(1);
		expect(onSubmit).toHaveBeenCalledWith({
			name: "React",
			category: "フロントエンド",
		});
	});

	test("キャンセルを押すとonCancelが呼ばれる", async () => {
		const user = userEvent.setup();
		const onSubmit = vi.fn();
		const onCancel = vi.fn();

		render(
			<SkillForm
				onSubmit={onSubmit}
				onCancel={onCancel}
				submitLabel="登録する"
			/>,
		);

		await user.click(screen.getByRole("button", { name: "キャンセル" }));

		expect(onCancel).toHaveBeenCalledTimes(1);
	});

	test("スキル名が未入力の場合はonSubmitが呼ばれない", async () => {
		const user = userEvent.setup();
		const onSubmit = vi.fn();
		const onCancel = vi.fn();
		const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

		render(
			<SkillForm
				onSubmit={onSubmit}
				onCancel={onCancel}
				submitLabel="登録する"
			/>,
		);

		await user.type(
			screen.getByPlaceholderText("例：フロントエンド"),
			"フロントエンド",
		);

		await user.click(screen.getByRole("button", { name: "登録する" }));

		expect(onSubmit).not.toHaveBeenCalled();
		expect(alertMock).toHaveBeenCalledWith("スキル名を入力してください。");

		alertMock.mockRestore();
	});
});
