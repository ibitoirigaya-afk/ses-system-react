import { BpCompanyForm } from "./BpCompanyForm";
import type { BpCompanyFormData } from "./bpCompanyTypes";

type Props = {
    onSubmit: (formData: BpCompanyFormData) => void;
    onCancel: () => void;
};

export function BpCompanyCreatePage({ onSubmit, onCancel }: Props) {
    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">BP企業登録</h1>
                <p className="mt-1 text-sm text-slate-600">
                    要員を保有しているBP企業・協力会社の情報を登録します。
                </p>
            </div>

            <BpCompanyForm
                submitLabel="BP企業を登録"
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </section>
    );
}