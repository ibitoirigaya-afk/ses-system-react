import type { Engineer } from "../engineers/engineerTypes";
import type { Project } from "../projects/projectTypes";
import type { ProposalHistory } from "./proposalTypes";

type Props = {
	proposalHistory: ProposalHistory;
	projects: Project[];
	engineers: Engineer[];
	onBack: () => void;
};

export default function ProposalHistoryDetailPage({
	proposalHistory,
	projects,
	engineers,
	onBack,
}: Props) {
	const project = projects.find(
		(project) => project.id === proposalHistory.projectId,
	);

	const engineer = engineers.find(
		(engineer) => engineer.id === proposalHistory.engineerId,
	);

	return (
		<div>
			<div className="mb-6">
				<button
					onClick={onBack}
					className="mb-3 rounded bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700"
				>
					← 提案履歴一覧へ戻る
				</button>

				<h2 className="text-2xl font-bold text-gray-900">提案履歴詳細</h2>

				<p className="mt-1 text-sm text-gray-500">
					提案した案件・要員・面談状況を確認できます。
				</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<div className="rounded-xl bg-white p-5 shadow">
					<h3 className="font-bold text-gray-900">案件情報</h3>

					<p className="mt-3 text-sm font-bold text-gray-700">
						{project?.title ?? "案件なし"}
					</p>

					<p className="mt-2 text-sm text-gray-600">
						{project?.description ?? ""}
					</p>

					<p className="mt-2 text-sm text-gray-700">
						勤務地：{project?.location ?? "-"}
					</p>

					<p className="mt-1 text-sm text-gray-700">
						単価：{project ? project.unitPrice.toLocaleString() : "-"}円
					</p>
				</div>

				<div className="rounded-xl bg-white p-5 shadow">
					<h3 className="font-bold text-gray-900">要員情報</h3>

					<p className="mt-3 text-sm font-bold text-gray-700">
						{engineer?.name ?? "要員なし"}
					</p>

					<p className="mt-2 text-sm text-gray-600">
						{engineer
							? `${engineer.companyName} / ${engineer.age}歳 / ${engineer.gender}`
							: "-"}
					</p>

					<p className="mt-2 text-sm text-gray-700">
						希望単価：
						{engineer ? engineer.desiredUnitPrice.toLocaleString() : "-"}円
					</p>

					<p className="mt-1 text-sm text-gray-700">
						経験年数：{engineer?.experienceYears ?? "-"}年
					</p>
				</div>
			</div>

			<div className="mt-6 rounded-xl bg-white p-6 shadow">
				<h3 className="mb-4 text-lg font-bold text-gray-900">提案内容</h3>

				<dl className="grid gap-4">
					<div>
						<dt className="text-sm font-bold text-gray-700">提案日</dt>
						<dd className="mt-1 text-gray-700">
							{proposalHistory.proposedDate}
						</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">面談日</dt>
						<dd className="mt-1 text-gray-700">
							{proposalHistory.interviewDate || "未定"}
						</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">ステータス</dt>
						<dd className="mt-1">
							<span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
								{proposalHistory.status}
							</span>
						</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">面談結果</dt>
						<dd className="mt-1 text-gray-700">
							{proposalHistory.interviewResult || "未入力"}
						</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">メモ</dt>
						<dd className="mt-1 whitespace-pre-wrap text-gray-700">
							{proposalHistory.memo || "メモなし"}
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}
