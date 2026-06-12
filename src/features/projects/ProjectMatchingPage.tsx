import { getMatchedEngineers } from "../../utils/matching";
import type { User } from "../auth/authTypes";
import type { Engineer } from "../engineers/engineerTypes";
import type { Project } from "./projectTypes";

type Props = {
	currentUser: User;
	projects: Project[];
	engineers: Engineer[];
	projectId: number;
	onBack: () => void;
	onCreateProposal: (projectId: number, engineerId: number) => void;
};

export default function ProjectMatchingPage({
	currentUser,
	projects,
	engineers,
	projectId,
	onBack,
	onCreateProposal,
}: Props) {
	const project = projects.find((project) => project.id === projectId);

	if (!project) {
		return (
			<div className="rounded-xl bg-white p-6 shadow">
				<h2 className="text-2xl font-bold text-gray-900">
					案件が見つかりません
				</h2>

				<button
					onClick={onBack}
					className="mt-4 rounded bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700"
				>
					案件一覧へ戻る
				</button>
			</div>
		);
	}

	const matchedEngineers = getMatchedEngineers(project, engineers);

	return (
		<div>
			<div className="mb-6 flex items-center justify-between">
				<div>
					<button
						onClick={onBack}
						className="mb-3 rounded bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700"
					>
						← 案件一覧へ戻る
					</button>

					<h2 className="text-2xl font-bold text-gray-900">マッチング結果</h2>

					<p className="mt-1 text-sm text-gray-500">
						{project.title} に合う要員をスキル一致率順に表示しています。
					</p>
				</div>

				<div className="rounded-xl bg-white px-4 py-3 text-sm shadow">
					<p className="font-bold text-gray-700">ログイン中</p>
					<p className="text-gray-500">
						{currentUser.name} / {currentUser.role}
					</p>
				</div>
			</div>

			<div className="mb-6 rounded-xl bg-white p-5 shadow">
				<h3 className="font-bold text-gray-900">案件情報</h3>

				<p className="mt-2 text-sm text-gray-700">勤務地：{project.location}</p>

				<p className="mt-1 text-sm text-gray-700">
					単価：{project.unitPrice.toLocaleString()}円
				</p>

				<div className="mt-3 flex flex-wrap gap-2">
					{project.skills.map((skill) => (
						<span
							key={skill.id}
							className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700"
						>
							{skill.name}
						</span>
					))}
				</div>
			</div>

			<div className="overflow-hidden rounded-xl bg-white shadow">
				<table className="w-full border-collapse">
					<thead className="bg-gray-100">
						<tr>
							<th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
								氏名
							</th>
							<th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
								所属会社
							</th>
							<th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
								保有スキル
							</th>
							<th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
								一致数
							</th>
							<th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
								一致率
							</th>
							<th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
								ステータス
							</th>
							<th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
								操作
							</th>
						</tr>
					</thead>

					<tbody>
						{matchedEngineers.map((matchedEngineer) => (
							<tr key={matchedEngineer.engineer.id} className="border-t">
								<td className="px-4 py-4 font-bold text-gray-900">
									{matchedEngineer.engineer.name}
								</td>

								<td className="px-4 py-4 text-sm text-gray-700">
									{matchedEngineer.engineer.companyName}
								</td>

								<td className="px-4 py-4">
									<div className="flex flex-wrap gap-2">
										{matchedEngineer.engineer.skills.map((skill) => {
											const isMatched =
												matchedEngineer.matchedSkillNames.includes(skill.name);

											return (
												<span
													key={skill.id}
													className={
														isMatched
															? "rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700"
															: "rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700"
													}
												>
													{skill.name}
												</span>
											);
										})}
									</div>
								</td>

								<td className="px-4 py-4 text-sm text-gray-700">
									{matchedEngineer.matchedCount} / {project.skills.length}
								</td>

								<td className="px-4 py-4">
									<span className="text-lg font-bold text-blue-700">
										{matchedEngineer.matchRate}%
									</span>
								</td>

								<td className="px-4 py-4">
									<span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
										{matchedEngineer.engineer.status}
									</span>
								</td>

								<td className="px-4 py-4">
									<button
										onClick={() =>
											onCreateProposal(project.id, matchedEngineer.engineer.id)
										}
										className="rounded bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700"
									>
										提案する
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
