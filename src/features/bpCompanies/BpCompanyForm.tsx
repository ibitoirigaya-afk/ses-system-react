import { useState } from "react";
import type { BpCompanyFormData } from "./bpCompanyTypes";

type Props = {
    initialData?: BpCompanyFormData;
    submitLabel: string;
    onSubmit: (formData: BpCompanyFormData) => void;
    onCancel: () => void;
};

const emptyFormData: BpCompanyFormData = {
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    memo: "",
};

export function BpCompanyForm({
    initialData,
    submitLabel,
    onSubmit,
    onCancel,
}: Props) {
    const [formData, setFormData] = useState<BpCompanyFormData>(
        initialData ?? emptyFormData,
    );
    const [errorMessage, setErrorMessage] = useState("");

    const updateField = (field: keyof BpCompanyFormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formData.name.trim() === "") {
            setErrorMessage("BP企業名を入力してください。");
            return;
        }

        if (formData.email.trim() !== "" && !formData.email.includes("@")) {
            setErrorMessage("メールアドレスの形式を確認してください。");
            return;
        }

        setErrorMessage("");
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 rounded-xl bg-white p-6 shadow">
            {errorMessage !== "" && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                    {errorMessage}
                </p>
            )}

            <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">
                    BP企業名 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
                    placeholder="例：テストBP株式会社"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">
                    担当者名
                </label>
                <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(event) => updateField("contactPerson", event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
                    placeholder="例：田中"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">
                    メールアドレス
                </label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
                    placeholder="例：bp@example.com"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">
                    電話番号
                </label>
                <input
                    type="text"
                    value={formData.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
                    placeholder="例：03-1234-5678"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">
                    住所
                </label>
                <input
                    type="text"
                    value={formData.address}
                    onChange={(event) => updateField("address", event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
                    placeholder="例：東京都"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">
                    メモ
                </label>
                <textarea
                    value={formData.memo}
                    onChange={(event) => updateField("memo", event.target.value)}
                    className="min-h-28 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
                    placeholder="取引状況や注意事項など"
                />
            </div>

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                    キャンセル
                </button>

                <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
                >
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}