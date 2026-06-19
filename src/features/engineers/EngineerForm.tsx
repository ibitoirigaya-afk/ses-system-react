import { useState } from "react";
import type { BpCompany } from "../bpCompanies/bpCompanyTypes";
import type { Skill } from "../skills/skillTypes";
import type { EngineerStatus } from "./engineerTypes";

type EngineerFormValues = {
	bpCompanyId: number | null;
	name: string;
	companyName: string;
	age: number;
	gender: string;
	nearestStation: string;
	desiredUnitPrice: number;
	experienceYears: number;
	availableDate: string;
	desiredLocation: string;
	desiredConditions: string;
	careerSummary: string;
	status: EngineerStatus;
	skillIds: number[];
};

type Props = {
	skills: Skill[];
	bpCompanies: BpCompany[];
	initialValues?: EngineerFormValues;
	onSubmit: (values: EngineerFormValues) => void;
	submitLabel: string;
	onCancel: () => void;
};

export type { EngineerFormValues };

export default function EngineerForm({
	skills,
	bpCompanies,
	initialValues,
	onSubmit,
	submitLabel,
	onCancel,
}: Props) {
	const [bpCompanyId, setBpCompanyId] = useState<number | null>(
		initialValues?.bpCompanyId ?? null,
	);
	const [name, setName] = useState(initialValues?.name ?? "");
	const [companyName, setCompanyName] = useState(
		initialValues?.companyName ?? "",
	);
	const [age, setAge] = useState(initialValues?.age ?? 0);
	const [gender, setGender] = useState(initialValues?.gender ?? "");
	const [nearestStation, setNearestStation] = useState(
		initialValues?.nearestStation ?? "",
	);
	const [desiredUnitPrice, setDesiredUnitPrice] = useState(
		initialValues?.desiredUnitPrice ?? 0,
	);
	const [experienceYears, setExperienceYears] = useState(
		initialValues?.experienceYears?.toString() ?? "",
	);
	const [availableDate, setAvailableDate] = useState(
		initialValues?.availableDate ?? "",
	);
	const [desiredLocation, setDesiredLocation] = useState(
		initialValues?.desiredLocation ?? "",
	);
	const [desiredConditions, setDesiredConditions] = useState(
		initialValues?.desiredConditions ?? "",
	);
	const [careerSummary, setCareerSummary] = useState(
		initialValues?.careerSummary ?? "",
	);

	const [status, setStatus] = useState<EngineerStatus>(
		initialValues?.status ?? "稼働可能",
	);

	const [skillIds, setSkillIds] = useState<number[]>(
		initialValues?.skillIds ?? [],
	);

	const handleToggleSkill = (skillId: number) => {
		setSkillIds((prev) =>
			prev.includes(skillId)
				? prev.filter((id) => id !== skillId)
				: [...prev, skillId],
		);
	};

	const handleSubmit = () => {
		if (name.trim() === "") {
			alert("氏名を入力してください。");
			return;
		}

		if (companyName.trim() === "") {
			alert("所属会社を入力してください。");
			return;
		}

		if (age < 18) {
			alert("年齢は18歳以上で入力してください。");
			return;
		}

		if (gender.trim() === "") {
			alert("性別を入力してください。");
			return;
		}

		if (nearestStation.trim() === "") {
			alert("最寄駅を入力してください。");
			return;
		}

		if (desiredUnitPrice <= 0) {
			alert("希望単価は1円以上で入力してください。");
			return;
		}

		if (experienceYears.trim() === "") {
			alert("経験年数を入力してください。");
			return;
		}

		if (Number(experienceYears) < 0) {
			alert("経験年数は0年以上で入力してください。");
			return;
		}

		if (availableDate.trim() === "") {
			alert("稼働可能日を入力してください。");
			return;
		}

		if (desiredLocation.trim() === "") {
			alert("希望勤務地を入力してください。");
			return;
		}

		if (desiredConditions.trim() === "") {
			alert("希望条件を入力してください。");
			return;
		}

		if (careerSummary.trim() === "") {
			alert("経歴概要を入力してください。");
			return;
		}

		if (skillIds.length === 0) {
			alert("保有スキルを1つ以上選択してください。");
			return;
		}

		onSubmit({
			bpCompanyId,
			name,
			companyName,
			age,
			gender,
			nearestStation,
			desiredUnitPrice,
			experienceYears: Number(experienceYears),
			availableDate,
			desiredLocation,
			desiredConditions,
			careerSummary,
			status,
			skillIds,
		});
	};

	return (
		<div className="rounded-xl bg-white p-6 shadow">
			<div className="grid gap-4">
				<div>
					<label className="mb-1 block text-sm font-bold text-gray-700">
						BP企業
					</label>

					<select
						value={bpCompanyId ?? ""}
						onChange={(event) =>
							setBpCompanyId(
								event.target.value === "" ? null : Number(event.target.value),
							)
						}
						className="w-full rounded border border-gray-300 px-3 py-2"
					>
						<option value="">BP企業を選択してください</option>

						{bpCompanies
							.filter((bpCompany) => bpCompany.deletedAt === null)
							.map((bpCompany) => (
								<option key={bpCompany.id} value={bpCompany.id}>
									{bpCompany.name}
								</option>
							))}
					</select>
				</div>
				<div>
					<label className="mb-1 block text-sm font-bold text-gray-700">
						氏名
					</label>

					<input
						value={name}
						onChange={(event) => setName(event.target.value)}
						className="w-full rounded border border-gray-300 px-3 py-2"
						placeholder="例：田中 太郎"
					/>
				</div>

				<div>
					<label className="mb-1 block text-sm font-bold text-gray-700">
						所属会社
					</label>

					<input
						value={companyName}
						onChange={(event) => setCompanyName(event.target.value)}
						className="w-full rounded border border-gray-300 px-3 py-2"
						placeholder="例：サンプルSES株式会社"
					/>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<div>
						<label className="mb-1 block text-sm font-bold text-gray-700">
							年齢
						</label>

						<input
							type="number"
							value={age}
							onChange={(event) => setAge(Number(event.target.value))}
							className="w-full rounded border border-gray-300 px-3 py-2"
						/>
					</div>

					<div>
						<label className="mb-1 block text-sm font-bold text-gray-700">
							性別
						</label>

						<input
							value={gender}
							onChange={(event) => setGender(event.target.value)}
							className="w-full rounded border border-gray-300 px-3 py-2"
							placeholder="例：男性 / 女性"
						/>
					</div>
				</div>

				<div>
					<label className="mb-1 block text-sm font-bold text-gray-700">
						最寄駅
					</label>

					<input
						value={nearestStation}
						onChange={(event) => setNearestStation(event.target.value)}
						className="w-full rounded border border-gray-300 px-3 py-2"
						placeholder="例：池袋"
					/>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<div>
						<label className="mb-1 block text-sm font-bold text-gray-700">
							希望単価
						</label>

						<input
							type="number"
							value={desiredUnitPrice}
							onChange={(event) =>
								setDesiredUnitPrice(Number(event.target.value))
							}
							className="w-full rounded border border-gray-300 px-3 py-2"
							placeholder="例：700000"
						/>
					</div>

					<div>
						<label className="mb-1 block text-sm font-bold text-gray-700">
							経験年数
						</label>

						<input
							type="number"
							value={experienceYears}
							onChange={(event) => setExperienceYears(event.target.value)}
							className="w-full rounded border border-gray-300 px-3 py-2"
							placeholder="例：3"
						/>
					</div>
				</div>

				<div>
					<label className="mb-1 block text-sm font-bold text-gray-700">
						稼働可能日
					</label>

					<input
						type="date"
						value={availableDate}
						onChange={(event) => setAvailableDate(event.target.value)}
						className="w-full rounded border border-gray-300 px-3 py-2"
					/>
				</div>

				<div>
					<label className="mb-1 block text-sm font-bold text-gray-700">
						希望勤務地
					</label>

					<input
						value={desiredLocation}
						onChange={(event) => setDesiredLocation(event.target.value)}
						className="w-full rounded border border-gray-300 px-3 py-2"
						placeholder="例：東京都内"
					/>
				</div>

				<div>
					<label className="mb-1 block text-sm font-bold text-gray-700">
						希望条件
					</label>

					<textarea
						value={desiredConditions}
						onChange={(event) => setDesiredConditions(event.target.value)}
						className="min-h-24 w-full rounded border border-gray-300 px-3 py-2"
						placeholder="例：リモート併用希望"
					/>
				</div>

				<div>
					<label className="mb-1 block text-sm font-bold text-gray-700">
						経歴概要
					</label>

					<textarea
						value={careerSummary}
						onChange={(event) => setCareerSummary(event.target.value)}
						className="min-h-28 w-full rounded border border-gray-300 px-3 py-2"
						placeholder="例：React、TypeScriptを中心に開発経験あり"
					/>
				</div>

				<div>
					<label className="mb-1 block text-sm font-bold text-gray-700">
						ステータス
					</label>

					<select
						value={status}
						onChange={(event) =>
							setStatus(event.target.value as EngineerStatus)
						}
						className="w-full rounded border border-gray-300 px-3 py-2"
					>
						<option value="稼働可能">稼働可能</option>
						<option value="提案中">提案中</option>
						<option value="稼働中">稼働中</option>
						<option value="停止中">停止中</option>
					</select>
				</div>

				<div>
					<p className="mb-2 text-sm font-bold text-gray-700">保有スキル</p>

					{skills.length === 0 && (
						<p className="text-sm text-gray-500">
							登録済みのスキルがありません。
						</p>
					)}

					<div className="flex flex-wrap gap-2">
						{skills.map((skill) => {
							const checked = skillIds.includes(skill.id);

							return (
								<button
									key={skill.id}
									type="button"
									onClick={() => handleToggleSkill(skill.id)}
									className={
										checked
											? "rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white"
											: "rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700"
									}
								>
									{skill.name}
								</button>
							);
						})}
					</div>
				</div>
			</div>

			<div className="mt-6 flex gap-3">
				<button
					onClick={handleSubmit}
					className="rounded bg-blue-600 px-4 py-2 text-sm font-bold text-white"
				>
					{submitLabel}
				</button>

				<button
					onClick={onCancel}
					className="rounded bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700"
				>
					キャンセル
				</button>
			</div>
		</div>
	);
}
