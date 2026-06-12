import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Skill } from "../skills/skillTypes";
import EngineerForm from "./EngineerForm";

const skills: Skill[] = [
	{
		id: 1,
		name: "React",
		category: "フロントエンド",
	},
	{
		id: 2,
		name: "Laravel",
		category: "バックエンド",
	},
];

describe("EngineerForm", () => {
	test("要員フォームが表示される", () => {
		render(
			<EngineerForm
				skills={skills}
				onSubmit={() => {}}
				submitLabel="登録"
				onCancel={() => {}}
			/>,
		);

		expect(screen.getByText("氏名")).toBeInTheDocument();
		expect(screen.getByText("所属会社")).toBeInTheDocument();
		expect(screen.getByText("年齢")).toBeInTheDocument();
		expect(screen.getByText("性別")).toBeInTheDocument();
		expect(screen.getByText("最寄駅")).toBeInTheDocument();
		expect(screen.getByText("希望単価")).toBeInTheDocument();
		expect(screen.getByText("経験年数")).toBeInTheDocument();
		expect(screen.getByText("稼働可能日")).toBeInTheDocument();
		expect(screen.getByText("希望勤務地")).toBeInTheDocument();
		expect(screen.getByText("経歴概要")).toBeInTheDocument();
		expect(screen.getByText("保有スキル")).toBeInTheDocument();
	});

	test("入力して登録するとonSubmitが呼ばれる", async () => {
		const user = userEvent.setup();
		const handleSubmit = vi.fn();

		const { container } = render(
			<EngineerForm
				skills={skills}
				onSubmit={handleSubmit}
				submitLabel="登録"
				onCancel={() => {}}
			/>,
		);

		await user.type(screen.getByPlaceholderText("例：田中 太郎"), "田中 太郎");
		await user.type(
			screen.getByPlaceholderText("例：サンプルSES株式会社"),
			"サンプルSES株式会社",
		);

		const numberInputs = screen.getAllByRole("spinbutton");

		const ageInput = numberInputs[0];
		await user.clear(ageInput);
		await user.type(ageInput, "28");

		await user.type(screen.getByPlaceholderText("例：男性 / 女性"), "男性");
		await user.type(screen.getByPlaceholderText("例：池袋"), "池袋");

		await user.type(screen.getByPlaceholderText("例：700000"), "700000");
		await user.type(screen.getByPlaceholderText("例：3"), "3");

		const availableDateInput = container.querySelector('input[type="date"]');

		if (!availableDateInput) {
			throw new Error("稼働可能日の入力欄が見つかりません");
		}

		await user.type(availableDateInput, "2026-07-01");

		await user.type(screen.getByPlaceholderText("例：東京都内"), "東京都内");
		await user.type(
			screen.getByPlaceholderText("例：リモート併用希望"),
			"リモート併用希望",
		);
		await user.type(
			screen.getByPlaceholderText("例：React、TypeScriptを中心に開発経験あり"),
			"ReactとTypeScriptを中心に開発経験あり",
		);

		await user.click(screen.getByRole("button", { name: "React" }));
		await user.click(screen.getByRole("button", { name: "登録" }));

		expect(handleSubmit).toHaveBeenCalledWith({
			name: "田中 太郎",
			companyName: "サンプルSES株式会社",
			age: 28,
			gender: "男性",
			nearestStation: "池袋",
			desiredUnitPrice: 700000,
			experienceYears: 3,
			availableDate: "2026-07-01",
			desiredLocation: "東京都内",
			desiredConditions: "リモート併用希望",
			careerSummary: "ReactとTypeScriptを中心に開発経験あり",
			status: "稼働可能",
			skillIds: [1],
		});
	});

	test("キャンセルを押すとonCancelが呼ばれる", async () => {
		const user = userEvent.setup();
		const handleCancel = vi.fn();

		render(
			<EngineerForm
				skills={skills}
				onSubmit={() => {}}
				submitLabel="登録"
				onCancel={handleCancel}
			/>,
		);

		await user.click(screen.getByRole("button", { name: "キャンセル" }));

		expect(handleCancel).toHaveBeenCalled();
	});
});
