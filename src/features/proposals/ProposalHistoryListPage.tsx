import { useState } from "react";
import StatusBadge from "../../components/StatusBadge";
import { canViewProposalHistory } from "../../utils/permissions";
import type { User } from "../auth/authTypes";
import type { Engineer } from "../engineers/engineerTypes";
import type { Project } from "../projects/projectTypes";
import type { ProposalHistory } from "./proposalTypes";

type SortType = "newest" | "oldest" | "interviewDateAsc";

type StatusFilter =
	| "all"
	| "提案中"
	| "面談調整中"
	| "面談予定"
	| "面談済み"
	| "成約"
	| "見送り";

type Props = {
	currentUser: User;
	proposalHistories: ProposalHistory[];
	projects: Project[];
	engineers: Engineer[];
	onOpenCreate: () => void;
	onShowDetail: (proposalHistory: ProposalHistory) => void;
	onEdit: (proposalHistory: ProposalHistory) => void;
	onDelete: (proposalHistoryId: number) => void;
	onRestore: (proposalHistoryId: number) => void;
};

export default function ProposalHistoryListPage({
	currentUser,
	proposalHistories,
	projects,
	engineers,
	onShowDetail,
	onEdit,
	onDelete,
	onRestore,
	onOpenCreate,
}: Props) {
	const [sortType, setSortType] = useState<SortType>("newest");
	const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
	const [showDeleted, setShowDeleted] = useState(false);

	const visibleProposalHistories = proposalHistories
		.filter((proposalHistory) =>
			canViewProposalHistory(currentUser, proposalHistory, projects, engineers),
		)
		.filter((proposalHistory) => {
			if (showDeleted) {
				return Boolean(proposalHistory.deletedAt);
			}

			return !proposalHistory.deletedAt;
		})
		.filter((proposalHistory) => {
			if (statusFilter === "all") {
				return true;
			}

			return proposalHistory.status === statusFilter;
		})
		.sort((a, b) => {
			if (sortType === "newest") {
				return b.proposedDate.localeCompare(a.proposedDate);
			}

			if (sortType === "oldest") {
				return a.proposedDate.localeCompare(b.proposedDate);
			}

			if (sortType === "interviewDateAsc") {
				if (!a.interviewDate && !b.interviewDate) {
					return 0;
				}

				if (!a.interviewDate) {
					return 1;
				}

				if (!b.interviewDate) {
					return -1;
				}

				return a.interviewDate.localeCompare(b.interviewDate);
			}

			return 0;
		});

	return (
		<div>
			<div className="mb-6 flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">提案履歴</h2>

					<p className="mt-1 text-sm text-gray-500">
						案件に対して提案した要員の履歴を確認できます。
					</p>
				</div>

				<div className="flex gap-2">
					<button
						onClick={() => setShowDeleted((prev) => !prev)}
						className={
							showDeleted
								? "rounded bg-gray-800 px-4 py-2 text-sm font-bold text-white"
								: "rounded bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700"
						}
					>
						{showDeleted ? "通常履歴を表示" : "削除済みを表示"}
					</button>

					{!showDeleted && (
						<button
							onClick={onOpenCreate}
							className="rounded bg-blue-600 px-4 py-2 text-sm font-bold text-white"
						>
							新規提案登録
						</button>
					)}
				</div>
			</div>

			<div className="mb-4 rounded-xl bg-white p-4 shadow">
				<div className="grid gap-4 md:grid-cols-2">
					<div>
						<label className="mb-2 block text-sm font-bold text-gray-700">
							並び替え
						</label>

						<select
							value={sortType}
							onChange={(event) => setSortType(event.target.value as SortType)}
							className="w-full rounded border border-gray-300 px-3 py-2"
						>
							<option value="newest">新着順</option>
							<option value="oldest">古い順</option>
							<option value="interviewDateAsc">面談日が近い順</option>
						</select>
					</div>

					<div>
						<label className="mb-2 block text-sm font-bold text-gray-700">
							ステータス
						</label>

						<select
							value={statusFilter}
							onChange={(event) =>
								setStatusFilter(event.target.value as StatusFilter)
							}
							className="w-full rounded border border-gray-300 px-3 py-2"
						>
							<option value="all">すべて</option>
							<option value="提案中">提案中</option>
							<option value="面談調整中">面談調整中</option>
							<option value="面談予定">面談予定</option>
							<option value="面談済み">面談済み</option>
							<option value="成約">成約</option>
							<option value="見送り">見送り</option>
						</select>
					</div>
				</div>

				<p className="mt-3 text-xs text-gray-500">
					表示中：{visibleProposalHistories.length}件
				</p>
			</div>

			<div className="overflow-hidden rounded-xl bg-white shadow">
				<table className="w-full border-collapse">
					<thead className="bg-gray-100">
						<tr>
							<th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
								案件名
							</th>
							<th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
								要員名
							</th>
							<th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
								提案日
							</th>
							<th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
								面談日
							</th>
							<th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
								ステータス
							</th>
							<th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
								メモ
							</th>
							<th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
								操作
							</th>
						</tr>
					</thead>

					<tbody>
						{visibleProposalHistories.map((proposalHistory) => {
							const project = projects.find(
								(project) => project.id === proposalHistory.projectId,
							);

							const engineer = engineers.find(
								(engineer) => engineer.id === proposalHistory.engineerId,
							);

							return (
								<tr key={proposalHistory.id} className="border-t">
									<td className="px-4 py-4 font-bold text-gray-900">
										{project?.title ?? "案件なし"}
									</td>

									<td className="px-4 py-4 text-sm text-gray-700">
										{engineer?.name ?? "要員なし"}
									</td>

									<td className="px-4 py-4 text-sm text-gray-700">
										{proposalHistory.proposedDate}
									</td>

									<td className="px-4 py-4 text-sm text-gray-700">
										{proposalHistory.interviewDate || "未定"}
									</td>

									<td className="px-4 py-4">
										<StatusBadge
											status={proposalHistory.status}
											type="proposal"
										/>
									</td>

									<td className="px-4 py-4 text-sm text-gray-600">
										{showDeleted && proposalHistory.deletedAt ? (
											<span className="font-bold text-red-600">
												削除日時：
												{new Date(proposalHistory.deletedAt).toLocaleString()}
											</span>
										) : (
											proposalHistory.memo || "メモなし"
										)}
									</td>

									<td className="px-4 py-4">
										<div className="flex gap-2">
											{showDeleted ? (
												<button
													onClick={() => {
														const ok = window.confirm(
															"この提案履歴を復元しますか？",
														);

														if (ok) {
															onRestore(proposalHistory.id);
														}
													}}
													className="rounded bg-green-100 px-3 py-1 text-xs font-bold text-green-700"
												>
													復元
												</button>
											) : (
												<>
													<button
														onClick={() => onShowDetail(proposalHistory)}
														className="rounded bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700"
													>
														詳細
													</button>

													<button
														onClick={() => onEdit(proposalHistory)}
														className="rounded bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700"
													>
														編集
													</button>

													<button
														onClick={() => {
															const ok = window.confirm(
																"この提案履歴を削除済みに移動しますか？",
															);

															if (ok) {
																onDelete(proposalHistory.id);
															}
														}}
														className="rounded bg-red-100 px-3 py-1 text-xs font-bold text-red-700"
													>
														削除
													</button>
												</>
											)}
										</div>
									</td>
								</tr>
							);
						})}

						{visibleProposalHistories.length === 0 && (
							<tr>
								<td
									colSpan={7}
									className="px-4 py-8 text-center text-sm text-gray-500"
								>
									{showDeleted
										? "削除済みの提案履歴はありません。"
										: "表示できる提案履歴がありません。"}
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
