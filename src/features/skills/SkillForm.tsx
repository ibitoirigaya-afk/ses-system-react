import { useState } from 'react'

type SkillFormValues = {
  name: string
  category: string
}

type Props = {
  initialValues?: SkillFormValues
  onSubmit: (values: SkillFormValues) => void
  submitLabel: string
  onCancel: () => void
}

export type { SkillFormValues }

export default function SkillForm({
  initialValues,
  onSubmit,
  submitLabel,
  onCancel,
}: Props) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [category, setCategory] = useState(initialValues?.category ?? '')

  const handleSubmit = () => {
  if (name.trim() === '') {
    alert('スキル名を入力してください。')
    return
  }

  if (category.trim() === '') {
    alert('カテゴリを入力してください。')
    return
  }

  onSubmit({
    name,
    category,
  })
}

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="grid gap-4">
        <div>
          <label className="mb-1 block text-sm font-bold text-gray-700">
            スキル名
          </label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2"
            placeholder="例：React"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-gray-700">
            カテゴリ
          </label>
          <input
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2"
            placeholder="例：フロントエンド"
          />
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
  )
}