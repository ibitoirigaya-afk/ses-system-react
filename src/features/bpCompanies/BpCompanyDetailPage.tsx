import type { Engineer } from "../engineers/engineerTypes";
import type { BpCompany } from "./bpCompanyTypes";

type Props = {
	bpCompany: BpCompany;
	engineers: Engineer[];
	onBack: () => void;
	onEdit: () => void;
};

export function BpCompanyDetailPage({
	bpCompany,
	engineers,
	onBack,
	onEdit,
}: Props) {
	const relatedEngineers = engineers.filter(
		(engineer) => engineer.bpCompanyId === bpCompany.id,
	);

	return (
		<div>
			<div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
				<div>
					<button
						onClick={onBack}
						className="mb-3 rounded bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700"
					>
						← BP企業一覧へ戻る
					</button>

					<h2 className="text-2xl font-bold text-gray-900">BP企業詳細</h2>

					<p className="mt-1 text-sm text-gray-500">
						BP企業の基本情報と所属要員を確認できます。
					</p>
				</div>

				<button
					onClick={onEdit}
					className="rounded bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
				>
					編集する
				</button>
			</div>

			<div className="rounded-xl bg-white p-6 shadow">
				<dl className="grid gap-5 md:grid-cols-2">
					<div>
						<dt className="text-sm font-bold text-gray-700">BP企業名</dt>
						<dd className="mt-1 text-lg font-bold text-gray-900">
							{bpCompany.name}
						</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">状態</dt>
						<dd className="mt-1">
							{bpCompany.deletedAt === null ? (
								<span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
									有効
								</span>
							) : (
								<span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
									削除済み
								</span>
							)}
						</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">担当者名</dt>
						<dd className="mt-1 text-gray-700">
							{bpCompany.contactPerson || "未登録"}
						</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">メールアドレス</dt>
						<dd className="mt-1 text-gray-700">
							{bpCompany.email || "未登録"}
						</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">電話番号</dt>
						<dd className="mt-1 text-gray-700">
							{bpCompany.phone || "未登録"}
						</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">住所</dt>
						<dd className="mt-1 text-gray-700">
							{bpCompany.address || "未登録"}
						</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">登録要員数</dt>
						<dd className="mt-1 text-gray-700">{relatedEngineers.length}人</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">登録日時</dt>
						<dd className="mt-1 text-gray-700">
							{new Date(bpCompany.createdAt).toLocaleString("ja-JP")}
						</dd>
					</div>

					<div className="md:col-span-2">
						<dt className="text-sm font-bold text-gray-700">メモ</dt>
						<dd className="mt-1 whitespace-pre-wrap text-gray-700">
							{bpCompany.memo || "未登録"}
						</dd>
					</div>
				</dl>
			</div>

			<div className="mt-6 rounded-xl bg-white p-6 shadow">
				<div className="mb-4">
					<h3 className="text-xl font-bold text-gray-900">所属要員一覧</h3>
					<p className="mt-1 text-sm text-gray-500">
						このBP企業に紐付いている要員を表示しています。
					</p>
				</div>

				{relatedEngineers.length === 0 ? (
					<p className="text-sm text-gray-500">
						このBP企業に紐付く要員はまだ登録されていません。
					</p>
				) : (
					<div className="overflow-x-auto">
						<table className="min-w-full border-collapse text-left text-sm">
							<thead>
								<tr className="border-b bg-gray-50 text-gray-700">
									<th className="px-4 py-3">氏名</th>
									<th className="px-4 py-3">ステータス</th>
									<th className="px-4 py-3">最寄駅</th>
									<th className="px-4 py-3">希望単価</th>
									<th className="px-4 py-3">経験年数</th>
									<th className="px-4 py-3">スキル</th>
								</tr>
							</thead>

							<tbody>
								{relatedEngineers.map((engineer) => (
									<tr key={engineer.id} className="border-b">
										<td className="px-4 py-3 font-bold text-gray-900">
											{engineer.name}
										</td>

										<td className="px-4 py-3 text-gray-700">
											{engineer.status}
										</td>

										<td className="px-4 py-3 text-gray-700">
											{engineer.nearestStation}
										</td>

										<td className="px-4 py-3 text-gray-700">
											{engineer.desiredUnitPrice.toLocaleString()}円
										</td>

										<td className="px-4 py-3 text-gray-700">
											{engineer.experienceYears}年
										</td>

										<td className="px-4 py-3">
											<div className="flex flex-wrap gap-2">
												{engineer.skills.length === 0 ? (
													<span className="text-gray-400">未登録</span>
												) : (
													engineer.skills.map((skill) => (
														<span
															key={skill.id}
															className="rounded-full bg-gray-100 px-2 py-1 text-xs font-bold text-gray-700"
														>
															{skill.name}
														</span>
													))
												)}
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}
