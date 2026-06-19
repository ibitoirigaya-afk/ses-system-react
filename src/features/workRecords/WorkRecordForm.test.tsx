import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import type { Engineer } from "../engineers/engineerTypes";
import type { Project } from "../projects/projectTypes";
import WorkRecordForm from "./WorkRecordForm";

const projects: Project[] = [
    {
        id: 1,
        userId: 1,
        title: "React案件",
        description: "React開発案件",
        location: "東京",
        unitPrice: 750000,
        status: "募集中",
        skills: [],
        deletedAt: null,
    },
];

const engineers: Engineer[] = [
    {
        id: 1,
        userId: 1,
        bpCompanyId: null,
        bpCompany: null,
        name: "山田 太郎",
        companyName: "テスト会社",
        age: 30,
        gender: "男性",
        nearestStation: "新宿",
        desiredUnitPrice: 600000,
        experienceYears: 5,
        availableDate: "2026-05-01",
        desiredLocation: "東京",
        desiredConditions: "リモート可",
        careerSummary: "React開発経験あり",
        status: "提案中",
        skills: [],
        deletedAt: null,
    },
];

describe("WorkRecordForm", () => {
    test("必要項目を入力して登録するとonSubmitが呼ばれる", async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();
        const onCancel = vi.fn();

        render(
            <WorkRecordForm
                projects={projects}
                engineers={engineers}
                onSubmit={onSubmit}
                onCancel={onCancel}
                submitLabel="登録する"
            />,
        );

        const selects = screen.getAllByRole("combobox");

        await user.selectOptions(selects[0], "1");
        await user.selectOptions(selects[1], "1");
        const monthInput = document.querySelector('input[type="month"]');

        if (!monthInput) {
            throw new Error("対象月の入力欄が見つかりません");
        }

        await user.clear(monthInput);
        await user.type(monthInput, "2026-06");
        await user.type(screen.getByPlaceholderText("例：160"), "160");
        await user.type(screen.getByPlaceholderText("例：750000"), "750000");
        await user.type(screen.getByPlaceholderText("例：550000"), "550000");
        await user.type(
            screen.getByPlaceholderText("稼働実績のメモを入力"),
            "6月分の稼働実績",
        );

        await user.click(screen.getByRole("button", { name: "登録する" }));

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({
            projectId: 1,
            engineerId: 1,
            targetMonth: "2026-06",
            workingHours: 160,
            billingAmount: 750000,
            paymentAmount: 550000,
            memo: "6月分の稼働実績",
        });
    });

    test("請求額と支払額から粗利が表示される", async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();
        const onCancel = vi.fn();

        render(
            <WorkRecordForm
                projects={projects}
                engineers={engineers}
                onSubmit={onSubmit}
                onCancel={onCancel}
                submitLabel="登録する"
            />,
        );

        await user.type(screen.getByPlaceholderText("例：750000"), "750000");
        await user.type(screen.getByPlaceholderText("例：550000"), "550000");

        expect(screen.getByText("200,000円")).toBeInTheDocument();
    });

    test("支払額が請求額を超える場合はonSubmitが呼ばれない", async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();
        const onCancel = vi.fn();
        const alertMock = vi.spyOn(window, "alert").mockImplementation(() => { });

        render(
            <WorkRecordForm
                projects={projects}
                engineers={engineers}
                onSubmit={onSubmit}
                onCancel={onCancel}
                submitLabel="登録する"
            />,
        );

        const selects = screen.getAllByRole("combobox");

        await user.selectOptions(selects[0], "1");
        await user.selectOptions(selects[1], "1");
        await user.type(screen.getByPlaceholderText("例：160"), "160");
        await user.type(screen.getByPlaceholderText("例：750000"), "500000");
        await user.type(screen.getByPlaceholderText("例：550000"), "600000");

        await user.click(screen.getByRole("button", { name: "登録する" }));

        expect(onSubmit).not.toHaveBeenCalled();
        expect(alertMock).toHaveBeenCalledWith(
            "支払額が請求額を超えています。金額を確認してください。",
        );

        alertMock.mockRestore();
    });
});
