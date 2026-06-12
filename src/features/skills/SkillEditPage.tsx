import SkillForm, { type SkillFormValues } from "./SkillForm";
import type { Skill } from "./skillTypes";

type Props = {
	skill: Skill;
	skills: Skill[];
	onUpdate: (skill: Skill) => void;
	onCancel: () => void;
};

export default function SkillEditPage({
	skill,
	skills,
	onUpdate,
	onCancel,
}: Props) {
	const handleSubmit = (values: SkillFormValues) => {
		const exists = skills.some(
			(existingSkill) =>
				existingSkill.id !== skill.id &&
				existingSkill.name.trim().toLowerCase() ===
					values.name.trim().toLowerCase(),
		);

		if (exists) {
			alert("同じスキル名がすでに登録されています。");
			return;
		}

		const updatedSkill: Skill = {
			...skill,
			name: values.name,
			category: values.category,
		};

		onUpdate(updatedSkill);
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

				<h2 className="text-2xl font-bold text-gray-900">スキル編集</h2>

				<p className="mt-1 text-sm text-gray-500">
					スキル名・カテゴリを編集します。
				</p>
			</div>

			<SkillForm
				submitLabel="更新する"
				onSubmit={handleSubmit}
				onCancel={onCancel}
				initialValues={{
					name: skill.name,
					category: skill.category,
				}}
			/>
		</div>
	);
}
