import type { Skill } from './skillTypes'

type Props = {
  skills: Skill[]
  onOpenCreate: () => void
  onOpenEdit: (skill: Skill) => void
  onDelete: (skillId: number) => void
}

export default function SkillListPage({
  skills,
  onOpenCreate,
  onOpenEdit,
  onDelete,
}: Props) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">スキル一覧</h2>
          <p className="mt-1 text-sm text-gray-500">
            登録されているスキルを確認できます。
          </p>
        </div>

        <button
          onClick={onOpenCreate}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-bold text-white"
        >
          新規スキル登録
        </button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                スキル名
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                カテゴリ
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                操作
              </th>
            </tr>
          </thead>

          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id} className="border-t">
                <td className="px-4 py-4 text-sm text-gray-700">
                  {skill.id}
                </td>

                <td className="px-4 py-4 font-bold text-gray-900">
                  {skill.name}
                </td>

                <td className="px-4 py-4">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">
                    {skill.category}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onOpenEdit(skill)}
                      className="rounded bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700"
                    >
                      編集
                    </button>

                    <button
                      onClick={() => {
                        const ok = window.confirm('このスキルを削除しますか？')

                        if (ok) {
                          onDelete(skill.id)
                        }
                      }}
                      className="rounded bg-red-100 px-3 py-1 text-xs font-bold text-red-700"
                    >
                      削除
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {skills.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  登録されているスキルがありません。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}