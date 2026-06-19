import { BpCompanyForm } from "./BpCompanyForm";
import type { BpCompany, BpCompanyFormData } from "./bpCompanyTypes";

type Props = {
    bpCompany: BpCompany;
    onSubmit: (id: number, formData: BpCompanyFormData) => void;
    onCancel: () => void;
};

export function BpCompanyEditPage({
    bpCompany,
    onSubmit,
    onCancel,
}: Props) {
    const initialData: BpCompanyFormData = {
        name: bpCompany.name,
        contactPerson: bpCompany.contactPerson ?? "",
        email: bpCompany.email ?? "",
        phone: bpCompany.phone ?? "",
        address: bpCompany.address ?? "",
        memo: bpCompany.memo ?? "",
    };

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">BP企業編集</h1>
                <p className="mt-1 text-sm text-slate-600">
                    BP企業・協力会社の連絡先やメモを編集します。
                </p>
            </div>

            <BpCompanyForm
                initialData={initialData}
                submitLabel="BP企業を更新"
                onSubmit={(formData) => onSubmit(bpCompany.id, formData)}
                onCancel={onCancel}
            />
        </section>
    );
}