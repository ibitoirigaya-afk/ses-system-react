import type { BpCompany } from "./bpCompanyTypes";

type Props = {
	bpCompanies: BpCompany[];
	isLoading: boolean;
	errorMessage: string;
	onCreate: () => void;
	onShow: (bpCompany: BpCompany) => void;
	onEdit: (bpCompany: BpCompany) => void;
	onDelete: (id: number) => void;
	onRestore: (id: number) => void;
};

export function BpCompanyListPage({
	bpCompanies,
	isLoading,
	errorMessage,
	onCreate,
	onShow,
	onEdit,
	onDelete,
	onRestore,
}: Props) {
	return (
		<section className="space-y-6">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-2xl font-bold text-slate-900">BP企業一覧</h1>
					<p className="mt-1 text-sm text-slate-600">
						要員を保有している協力会社・BP企業を管理します。
					</p>
				</div>

				<button
					type="button"
					onClick={onCreate}
					className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
				>
					BP企業登録
				</button>
			</div>

			{errorMessage !== "" && (
				<p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
					{errorMessage}
				</p>
			)}

			{isLoading ? (
				<div className="rounded-xl bg-white p-6 text-sm text-slate-600 shadow">
					読み込み中...
				</div>
			) : bpCompanies.length === 0 ? (
				<div className="rounded-xl bg-white p-6 text-sm text-slate-600 shadow">
					BP企業がまだ登録されていません。
				</div>
			) : (
				<div className="overflow-hidden rounded-xl bg-white shadow">
					<table className="w-full border-collapse text-left text-sm">
						<thead className="bg-slate-100 text-slate-700">
							<tr>
								<th className="px-4 py-3">企業名</th>
								<th className="px-4 py-3">担当者</th>
								<th className="px-4 py-3">メール</th>
								<th className="px-4 py-3">電話番号</th>
								<th className="px-4 py-3">要員数</th>
								<th className="px-4 py-3">状態</th>
								<th className="px-4 py-3">操作</th>
							</tr>
						</thead>

						<tbody>
							{bpCompanies.map((bpCompany) => (
								<tr key={bpCompany.id} className="border-t border-slate-200">
									<td className="px-4 py-3 font-bold text-slate-900">
										{bpCompany.name}
									</td>
									<td className="px-4 py-3 text-slate-700">
										{bpCompany.contactPerson || "-"}
									</td>
									<td className="px-4 py-3 text-slate-700">
										{bpCompany.email || "-"}
									</td>
									<td className="px-4 py-3 text-slate-700">
										{bpCompany.phone || "-"}
									</td>
									<td className="px-4 py-3 text-slate-700">
										{bpCompany.engineersCount}人
									</td>
									<td className="px-4 py-3">
										{bpCompany.deletedAt === null ? (
											<span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
												有効
											</span>
										) : (
											<span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-600">
												削除済み
											</span>
										)}
									</td>
									<td className="px-4 py-3">
										<div className="flex flex-wrap gap-2">
											<button
												type="button"
												onClick={() => onShow(bpCompany)}
												className="rounded border border-slate-300 px-3 py-1 text-xs font-bold text-slate-700 hover:bg-slate-50"
											>
												詳細
											</button>

											<button
												type="button"
												onClick={() => onEdit(bpCompany)}
												className="rounded border border-blue-300 px-3 py-1 text-xs font-bold text-blue-700 hover:bg-blue-50"
											>
												編集
											</button>

											{bpCompany.deletedAt === null ? (
												<button
													type="button"
													onClick={() => onDelete(bpCompany.id)}
													className="rounded border border-red-300 px-3 py-1 text-xs font-bold text-red-700 hover:bg-red-50"
												>
													削除
												</button>
											) : (
												<button
													type="button"
													onClick={() => onRestore(bpCompany.id)}
													className="rounded border border-green-300 px-3 py-1 text-xs font-bold text-green-700 hover:bg-green-50"
												>
													復元
												</button>
											)}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</section>
	);
}
