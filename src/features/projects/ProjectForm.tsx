import { useState } from 'react'
import type { ProjectStatus } from './projectTypes'
import type { Skill } from '../skills/skillTypes'

type ProjectFormValues = {
  title: string
  description: string
  location: string
  unitPrice: number
  status: ProjectStatus
  skillIds: number[]
}

type Props = {
  skills: Skill[]
  initialValues?: ProjectFormValues
  onSubmit: (values: ProjectFormValues) => void
  submitLabel: string
  onCancel: () => void
}

export type { ProjectFormValues }

export default function ProjectForm({
  skills,
  initialValues,
  onSubmit,
  submitLabel,
  onCancel,
}: Props) {
  const [title, setTitle] = useState(initialValues?.title ?? '')
  const [description, setDescription] = useState(
    initialValues?.description ?? '',
  )
  const [location, setLocation] = useState(initialValues?.location ?? '')
  const [unitPrice, setUnitPrice] = useState(initialValues?.unitPrice ?? 0)

  const [status, setStatus] = useState<ProjectStatus>(
    initialValues?.status ?? '募集中',
  )

  const [skillIds, setSkillIds] = useState<number[]>(
    initialValues?.skillIds ?? [],
  )

  const handleToggleSkill = (skillId: number) => {
    setSkillIds((prev) =>
      prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId],
    )
  }

  const handleSubmit = () => {
  if (title.trim() === '') {
    alert('案件名を入力してください。')
    return
  }

  if (description.trim() === '') {
    alert('案件概要を入力してください。')
    return
  }

  if (location.trim() === '') {
    alert('勤務地を入力してください。')
    return
  }

  if (unitPrice <= 0) {
    alert('単価は1円以上で入力してください。')
    return
  }

  if (skillIds.length === 0) {
    alert('必要スキルを1つ以上選択してください。')
    return
  }

  onSubmit({
    title,
    description,
    location,
    unitPrice,
    status,
    skillIds,
  })
}

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="grid gap-4">
        <div>
          <label className="mb-1 block text-sm font-bold text-gray-700">
            案件名
          </label>

          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2"
            placeholder="例：React管理画面開発案件"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-gray-700">
            案件概要
          </label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="min-h-28 w-full rounded border border-gray-300 px-3 py-2"
            placeholder="案件内容を入力"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-gray-700">
            勤務地
          </label>

          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2"
            placeholder="例：東京都 渋谷"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-gray-700">
            単価
          </label>

          <input
            type="number"
            value={unitPrice}
            onChange={(event) => setUnitPrice(Number(event.target.value))}
            className="w-full rounded border border-gray-300 px-3 py-2"
            placeholder="例：750000"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-gray-700">
            ステータス
          </label>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as ProjectStatus)}
            className="w-full rounded border border-gray-300 px-3 py-2"
          >
            <option value="募集中">募集中</option>
            <option value="提案中">提案中</option>
            <option value="成約">成約</option>
            <option value="終了">終了</option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-sm font-bold text-gray-700">必要スキル</p>

          {skills.length === 0 && (
            <p className="text-sm text-gray-500">
              登録済みのスキルがありません。
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => {
              const checked = skillIds.includes(skill.id)

              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => handleToggleSkill(skill.id)}
                  className={
                    checked
                      ? 'rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white'
                      : 'rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700'
                  }
                >
                  {skill.name}
                </button>
              )
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
  )
}