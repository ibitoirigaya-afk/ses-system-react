import SkillForm, { type SkillFormValues } from "./SkillForm";
import type { Skill } from "./skillTypes";

type Props = {
	skills: Skill[];
	onCreate: (skill: Skill) => void;
	onCancel: () => void;
};

export default function SkillCreatePage({ skills, onCreate, onCancel }: Props) {
	const handleSubmit = (values: SkillFormValues) => {
		const exists = skills.some(
			(skill) =>
				skill.name.trim().toLowerCase() === values.name.trim().toLowerCase(),
		);

		if (exists) {
			alert("同じスキル名がすでに登録されています。");
			return;
		}

		const newSkill: Skill = {
			id: Date.now(),
			name: values.name,
			category: values.category,
		};

		onCreate(newSkill);
	};

	return (
		<div>
			<div className="mb-6">
				<button
					onClick={onCancel}
					className="mb-3 rounded bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700"
				>
					← スキル一覧へ戻る
				</button>

				<h2 className="text-2xl font-bold text-gray-900">スキル登録</h2>

				<p className="mt-1 text-sm text-gray-500">新しいスキルを登録します。</p>
			</div>

			<SkillForm
				submitLabel="登録する"
				onSubmit={handleSubmit}
				onCancel={onCancel}
			/>
		</div>
	);
}
