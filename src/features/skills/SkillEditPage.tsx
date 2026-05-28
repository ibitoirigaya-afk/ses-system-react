import type { Skill } from './skillTypes'
import SkillForm, { type SkillFormValues } from './SkillForm'

type Props = {
  skill: Skill
  onUpdate: (skill: Skill) => void
  onCancel: () => void
}

export default function SkillEditPage({
  skill,
  onUpdate,
  onCancel,
}: Props) {
  const handleSubmit = (values: SkillFormValues) => {
    const updatedSkill: Skill = {
      ...skill,
      name: values.name,
      category: values.category,
    }

    onUpdate(updatedSkill)
  }

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
  )
}