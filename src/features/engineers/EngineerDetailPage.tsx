import type { Engineer } from "./engineerTypes";

type Props = {
	engineer: Engineer;
	onBack: () => void;
};

export default function EngineerDetailPage({ engineer, onBack }: Props) {
	return (
		<div>
			<div className="mb-6">
				<button
					onClick={onBack}
					className="mb-3 rounded bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700"
				>
					← 要員一覧へ戻る
				</button>

				<h2 className="text-2xl font-bold text-gray-900">要員詳細</h2>

				<p className="mt-1 text-sm text-gray-500">
					要員のプロフィール・希望条件・スキルを確認できます。
				</p>
			</div>

			<div className="rounded-xl bg-white p-6 shadow">
				<dl className="grid gap-5">
					<div>
						<dt className="text-sm font-bold text-gray-700">氏名</dt>
						<dd className="mt-1 text-lg font-bold text-gray-900">
							{engineer.name}
						</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">所属会社</dt>
						<dd className="mt-1 text-gray-700">{engineer.companyName}</dd>
					</div>

					<div className="grid gap-5 md:grid-cols-2">
						<div>
							<dt className="text-sm font-bold text-gray-700">年齢</dt>
							<dd className="mt-1 text-gray-700">{engineer.age}歳</dd>
						</div>

						<div>
							<dt className="text-sm font-bold text-gray-700">性別</dt>
							<dd className="mt-1 text-gray-700">{engineer.gender}</dd>
						</div>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">最寄駅</dt>
						<dd className="mt-1 text-gray-700">{engineer.nearestStation}</dd>
					</div>

					<div className="grid gap-5 md:grid-cols-2">
						<div>
							<dt className="text-sm font-bold text-gray-700">希望単価</dt>
							<dd className="mt-1 text-gray-700">
								{engineer.desiredUnitPrice.toLocaleString()}円
							</dd>
						</div>

						<div>
							<dt className="text-sm font-bold text-gray-700">経験年数</dt>
							<dd className="mt-1 text-gray-700">
								{engineer.experienceYears}年
							</dd>
						</div>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">稼働可能日</dt>
						<dd className="mt-1 text-gray-700">{engineer.availableDate}</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">希望勤務地</dt>
						<dd className="mt-1 text-gray-700">{engineer.desiredLocation}</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">希望条件</dt>
						<dd className="mt-1 whitespace-pre-wrap text-gray-700">
							{engineer.desiredConditions}
						</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">経歴概要</dt>
						<dd className="mt-1 whitespace-pre-wrap text-gray-700">
							{engineer.careerSummary}
						</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">ステータス</dt>
						<dd className="mt-1">
							<span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
								{engineer.status}
							</span>
						</dd>
					</div>

					<div>
						<dt className="text-sm font-bold text-gray-700">保有スキル</dt>
						<dd className="mt-2 flex flex-wrap gap-2">
							{engineer.skills.map((skill) => (
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
		</div>
	);
}
