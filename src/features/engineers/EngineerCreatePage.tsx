import type { User } from "../auth/authTypes";
import type { Skill } from "../skills/skillTypes";
import EngineerForm, { type EngineerFormValues } from "./EngineerForm";
import type { Engineer } from "./engineerTypes";

type Props = {
	currentUser: User;
	skills: Skill[];
	onCreate: (engineer: Engineer) => void;
	onCancel: () => void;
};

export default function EngineerCreatePage({
	currentUser,
	skills,
	onCreate,
	onCancel,
}: Props) {
	const handleSubmit = (values: EngineerFormValues) => {
		const selectedSkills = skills.filter((skill) =>
			values.skillIds.includes(skill.id),
		);

		const newEngineer: Engineer = {
			id: Date.now(),
			userId: currentUser.id,
			name: values.name,
			companyName: values.companyName,
			age: values.age,
			gender: values.gender,
			nearestStation: values.nearestStation,
			desiredUnitPrice: values.desiredUnitPrice,
			experienceYears: values.experienceYears,
			availableDate: values.availableDate,
			desiredLocation: values.desiredLocation,
			desiredConditions: values.desiredConditions,
			careerSummary: values.careerSummary,
			status: values.status,
			skills: selectedSkills,
		};

		onCreate(newEngineer);
	};

	return (
		<div>
			<div className="mb-6">
				<button
					onClick={onCancel}
					className="mb-3 rounded bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700"
				>
					← 要員一覧へ戻る
				</button>

				<h2 className="text-2xl font-bold text-gray-900">要員登録</h2>

				<p className="mt-1 text-sm text-gray-500">
					新しい要員情報を登録します。
				</p>
			</div>

			<EngineerForm
				skills={skills}
				submitLabel="登録する"
				onSubmit={handleSubmit}
				onCancel={onCancel}
			/>
		</div>
	);
}
