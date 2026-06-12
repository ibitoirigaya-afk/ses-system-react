import { useState } from "react";
import type { Engineer } from "../engineers/engineerTypes";
import type { Project } from "../projects/projectTypes";
import type { ProposalHistory, ProposalStatus } from "./proposalTypes";

type Props = {
	proposalHistory: ProposalHistory;
	projects: Project[];
	engineers: Engineer[];
	onBack: () => void;
	onUpdate: (proposalHistory: ProposalHistory) => void;
};

export default function ProposalHistoryEditPage({
	proposalHistory,
	projects,
	engineers,
	onBack,
	onUpdate,
}: Props) {
	const project = projects.find(
		(project) => project.id === proposalHistory.projectId,
	);

	const engineer = engineers.find(
		(engineer) => engineer.id === proposalHistory.engineerId,
	);

	const [proposedDate, setProposedDate] = useState(
		proposalHistory.proposedDate,
	);

	const [interviewDate, setInterviewDate] = useState(
		proposalHistory.interviewDate,
	);

	const [status, setStatus] = useState<ProposalStatus>(proposalHistory.status);

	const [interviewResult, setInterviewResult] = useState(
		proposalHistory.interviewResult,
	);

	const [memo, setMemo] = useState(proposalHistory.memo);

	const handleSubmit = () => {
		const updatedProposalHistory: ProposalHistory = {
			...proposalHistory,
			proposedDate,
			interviewDate,
			status,
			interviewResult,
			memo,
		};

		onUpdate(updatedProposalHistory);
	};

	return (
		<div>
			<div className="mb-6">
				<button
					onClick={onBack}
					className="mb-3 rounded bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700"
				>
					← 提案履歴一覧へ戻る
				</button>

				<h2 className="text-2xl font-bold text-gray-900">提案履歴編集</h2>

				<p className="mt-1 text-sm text-gray-500">
					提案日・面談日・ステータス・メモを編集できます。
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
						経験年数：{engineer?.experienceYears ?? "-"}年
					</p>
				</div>
			</div>

			<div className="mt-6 rounded-xl bg-white p-6 shadow">
				<h3 className="mb-4 text-lg font-bold text-gray-900">編集内容</h3>

				<div className="grid gap-4">
					<div>
						<label className="mb-1 block text-sm font-bold text-gray-700">
							提案日
						</label>

						<input
							type="date"
							value={proposedDate}
							onChange={(event) => setProposedDate(event.target.value)}
							className="w-full rounded border border-gray-300 px-3 py-2"
						/>
					</div>

					<div>
						<label className="mb-1 block text-sm font-bold text-gray-700">
							面談日
						</label>

						<input
							type="date"
							value={interviewDate}
							onChange={(event) => setInterviewDate(event.target.value)}
							className="w-full rounded border border-gray-300 px-3 py-2"
						/>
					</div>

					<div>
						<label className="mb-1 block text-sm font-bold text-gray-700">
							ステータス
						</label>

						<select
							value={status}
							onChange={(event) =>
								setStatus(event.target.value as ProposalStatus)
							}
							className="w-full rounded border border-gray-300 px-3 py-2"
						>
							<option value="提案中">提案中</option>
							<option value="面談調整中">面談調整中</option>
							<option value="面談予定">面談予定</option>
							<option value="面談済み">面談済み</option>
							<option value="成約">成約</option>
							<option value="見送り">見送り</option>
						</select>
					</div>

					<div>
						<label className="mb-1 block text-sm font-bold text-gray-700">
							面談結果
						</label>

						<input
							type="text"
							value={interviewResult}
							onChange={(event) => setInterviewResult(event.target.value)}
							className="w-full rounded border border-gray-300 px-3 py-2"
							placeholder="例：結果待ち、見送り、成約など"
						/>
					</div>

					<div>
						<label className="mb-1 block text-sm font-bold text-gray-700">
							メモ
						</label>

						<textarea
							value={memo}
							onChange={(event) => setMemo(event.target.value)}
							className="min-h-28 w-full rounded border border-gray-300 px-3 py-2"
							placeholder="提案時のメモを入力"
						/>
					</div>
				</div>

				<div className="mt-6 flex gap-3">
					<button
						onClick={handleSubmit}
						className="rounded bg-blue-600 px-4 py-2 text-sm font-bold text-white"
					>
						更新する
					</button>

					<button
						onClick={onBack}
						className="rounded bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700"
					>
						キャンセル
					</button>
				</div>
			</div>
		</div>
	);
}
