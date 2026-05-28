import type { User } from '../auth/authTypes'
import type { Engineer } from './engineerTypes'
import { canEditEngineer, canViewEngineer } from '../../utils/permissions'
import StatusBadge from '../../components/StatusBadge'

type Props = {
  currentUser: User
  engineers: Engineer[]
  onOpenCreate: () => void
  onOpenDetail: (engineer: Engineer) => void
  onOpenEdit: (engineer: Engineer) => void
  onDelete: (engineerId: number) => void
}

export default function EngineerListPage({
  currentUser,
  engineers,
  onOpenCreate,
  onOpenDetail,
  onOpenEdit,
  onDelete,
}: Props) {
  const visibleEngineers = engineers.filter((engineer) =>
    canViewEngineer(currentUser, engineer),
  )

  if (currentUser.role === 'company') {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="text-2xl font-bold text-gray-900">権限がありません</h2>
        <p className="mt-2 text-gray-600">
          companyユーザーは要員一覧を閲覧できません。
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">要員一覧</h2>
          <p className="mt-1 text-sm text-gray-500">
            登録されている要員を確認できます。
          </p>
        </div>

        {(currentUser.role === 'admin' || currentUser.role === 'user') && (
          <button
            onClick={onOpenCreate}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-bold text-white"
          >
            新規要員登録
          </button>
        )}
      </div>

      <div className="grid gap-4">
        {visibleEngineers.map((engineer) => (
          <div key={engineer.id} className="rounded-xl bg-white p-5 shadow">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {engineer.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {engineer.companyName} / {engineer.age}歳 / {engineer.gender}
                </p>

                <p className="mt-2 text-sm text-gray-700">
                  最寄駅：{engineer.nearestStation}
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  希望単価：{engineer.desiredUnitPrice.toLocaleString()}円
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  経験年数：{engineer.experienceYears}年
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  稼働可能日：{engineer.availableDate}
                </p>
              </div>

              <StatusBadge status={engineer.status} type="engineer" />
            </div>

            <div className="mt-4">
              <p className="text-sm font-bold text-gray-700">スキル</p>

              <div className="mt-2 flex flex-wrap gap-2">
                {engineer.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              {engineer.careerSummary}
            </p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => onOpenDetail(engineer)}
                className="rounded bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700"
              >
                詳細
              </button>

              {canEditEngineer(currentUser, engineer) && (
                <>
                  <button
                    onClick={() => onOpenEdit(engineer)}
                    className="rounded bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700"
                  >
                    編集
                  </button>

                  <button
                    onClick={() => {
                      const ok = window.confirm('この要員を削除しますか？')

                      if (ok) {
                        onDelete(engineer.id)
                      }
                    }}
                    className="rounded bg-red-100 px-3 py-1 text-xs font-bold text-red-700"
                  >
                    削除
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        {visibleEngineers.length === 0 && (
          <div className="rounded-xl bg-white p-6 text-center text-sm text-gray-500 shadow">
            表示できる要員がありません。
          </div>
        )}
      </div>
    </div>
  )
}