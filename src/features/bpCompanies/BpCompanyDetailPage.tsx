import type { BpCompany } from "./bpCompanyTypes";

type Props = {
    bpCompany: BpCompany;
    onBack: () => void;
    onEdit: (bpCompany: BpCompany) => void;
};

export function BpCompanyDetailPage({ bpCompany, onBack, onEdit }: Props) {
    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">BP企業詳細</h1>
                    <p className="mt-1 text-sm text-slate-600">
                        BP企業の連絡先や紐付く要員数を確認します。
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={onBack}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
                    >
                        一覧に戻る
                    </button>

                    <button
                        type="button"
                        onClick={() => onEdit(bpCompany)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
                    >
                        編集
                    </button>
                </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
                <dl className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <dt className="text-sm font-bold text-slate-500">企業名</dt>
                        <dd className="mt-1 text-base font-bold text-slate-900">
                            {bpCompany.name}
                        </dd>
                    </div>

                    <div>
                        <dt className="text-sm font-bold text-slate-500">状態</dt>
                        <dd className="mt-1">
                            {bpCompany.deletedAt === null ? (
                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                                    有効
                                </span>
                            ) : (
                                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-600">
                                    削除済み
                                </span>
                            )}
                        </dd>
                    </div>

                    <div>
                        <dt className="text-sm font-bold text-slate-500">担当者名</dt>
                        <dd className="mt-1 text-slate-900">
                            {bpCompany.contactPerson || "-"}
                        </dd>
                    </div>

                    <div>
                        <dt className="text-sm font-bold text-slate-500">メールアドレス</dt>
                        <dd className="mt-1 text-slate-900">{bpCompany.email || "-"}</dd>
                    </div>

                    <div>
                        <dt className="text-sm font-bold text-slate-500">電話番号</dt>
                        <dd className="mt-1 text-slate-900">{bpCompany.phone || "-"}</dd>
                    </div>

                    <div>
                        <dt className="text-sm font-bold text-slate-500">住所</dt>
                        <dd className="mt-1 text-slate-900">{bpCompany.address || "-"}</dd>
                    </div>

                    <div>
                        <dt className="text-sm font-bold text-slate-500">要員数</dt>
                        <dd className="mt-1 text-slate-900">
                            {bpCompany.engineersCount}人
                        </dd>
                    </div>

                    <div>
                        <dt className="text-sm font-bold text-slate-500">登録日時</dt>
                        <dd className="mt-1 text-slate-900">{bpCompany.createdAt}</dd>
                    </div>

                    <div className="sm:col-span-2">
                        <dt className="text-sm font-bold text-slate-500">メモ</dt>
                        <dd className="mt-1 whitespace-pre-wrap text-slate-900">
                            {bpCompany.memo || "-"}
                        </dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}