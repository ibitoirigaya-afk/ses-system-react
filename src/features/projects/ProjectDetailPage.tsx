import { getMatchedEngineers } from "../../utils/matching";
import type { Engineer } from "../engineers/engineerTypes";
import type { Project } from "./projectTypes";

type Props = {
	project: Project;
	engineers: Engineer[];
	onBack: () => void;
};

export default function ProjectDetailPage({
	project,
	engineers,
	onBack,
}: Props) {
	const matchedEngineers = getMatchedEngineers(project, engineers);

	return (
		<div>
			<div className="mb-6">
				<button
					onClick={onBack}
					className="mb-3 rounded bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700"
				>
					← 案件一覧へ戻る
				</button>

				<h2 className="text-2xl font-bold text-gray-900">案件詳細</h2>

				<p className="mt-1 text-sm text-gray-500">
					案件の詳しい情報と候補要員を確認できます。
				</p>
			</div>

			<div className="rounded-xl bg-white p-6 shadow">
				<dl className="grid gap-5">
					<div>
						<dt className="text-sm font-bold text-gray-700">案件名</dt>
						<dd className="mt-1 text-lg font-bold text-gray-900">
							{project.title}
						</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">案件概要</dt>
						<dd className="mt-1 whitespace-pre-wrap text-gray-700">
							{project.description}
						</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">勤務地</dt>
						<dd className="mt-1 text-gray-700">{project.location}</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">単価</dt>
						<dd className="mt-1 text-gray-700">
							{project.unitPrice.toLocaleString()}円
						</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">ステータス</dt>
						<dd className="mt-1">
							<span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
								{project.status}
							</span>
						</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">必要スキル</dt>
						<dd className="mt-2 flex flex-wrap gap-2">
							{project.skills.map((skill) => (
								<span
									key={skill.id}
									className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700"
								>
									{skill.name}
								</span>
							))}
						</dd>
					</div>
				</dl>
			</div>

			<div className="mt-6 rounded-xl bg-white p-6 shadow">
				<div className="mb-4">
					<h3 className="text-xl font-bold text-gray-900">候補要員一覧</h3>
					<p className="mt-1 text-sm text-gray-500">
						必要スキルとの一致率が高い順に表示しています。
					</p>
				</div>

				{matchedEngineers.length === 0 ? (
					<p className="text-sm text-gray-500">
						候補要員が登録されていません。
					</p>
				) : (
					<div className="space-y-3">
						{matchedEngineers.map((matchedEngineer) => (
							<div
								key={matchedEngineer.engineer.id}
								className="rounded-lg border border-gray-200 p-4"
							>
								<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
									<div>
										<p className="text-lg font-bold text-gray-900">
											{matchedEngineer.engineer.name}
										</p>

										<p className="mt-1 text-sm text-gray-500">
											BP企業：
											{matchedEngineer.engineer.bpCompany?.name ??
												matchedEngineer.engineer.companyName}
										</p>
									</div>

									<div className="text-left md:text-right">
										<p className="text-2xl font-bold text-blue-600">
											{matchedEngineer.matchRate}%
										</p>

										<p className="text-sm text-gray-500">
											共通スキル：{matchedEngineer.matchedCount} /{" "}
											{project.skills.length}
										</p>
									</div>
								</div>

								<div className="mt-3">
									<p className="text-sm font-bold text-gray-700">一致スキル</p>

									<div className="mt-2 flex flex-wrap gap-2">
										{matchedEngineer.matchedSkillNames.length === 0 ? (
											<span className="text-sm text-gray-400">
												一致スキルなし
											</span>
										) : (
											matchedEngineer.matchedSkillNames.map((skillName) => (
												<span
													key={skillName}
													className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700"
												>
													{skillName}
												</span>
											))
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
