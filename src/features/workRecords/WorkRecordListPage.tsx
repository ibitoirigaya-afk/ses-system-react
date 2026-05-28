import type { Project } from '../projects/projectTypes'
import type { Engineer } from '../engineers/engineerTypes'
import type { WorkRecord } from './workRecordTypes'

type Props = {
  workRecords: WorkRecord[]
  projects: Project[]
  engineers: Engineer[]
  onOpenCreate: () => void
  onOpenEdit: (workRecord: WorkRecord) => void
  onDelete: (workRecordId: number) => void
}

export default function WorkRecordListPage({
  workRecords,
  projects,
  engineers,
  onOpenCreate,
  onOpenEdit,
  onDelete,
}: Props) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">稼働実績</h2>

          <p className="mt-1 text-sm text-gray-500">
            稼働時間・請求額・支払額・粗利を確認できます。
          </p>
        </div>

        <button
          onClick={onOpenCreate}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-bold text-white"
        >
          新規稼働実績登録
        </button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                対象月
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                案件名
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                要員名
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                稼働時間
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                請求額
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                支払額
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                粗利
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                操作
              </th>
            </tr>
          </thead>

          <tbody>
            {workRecords.map((workRecord) => {
              const project = projects.find(
                (project) => project.id === workRecord.projectId,
              )

              const engineer = engineers.find(
                (engineer) => engineer.id === workRecord.engineerId,
              )

              return (
                <tr key={workRecord.id} className="border-t">
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {workRecord.targetMonth}
                  </td>

                  <td className="px-4 py-4 font-bold text-gray-900">
                    {project?.title ?? '案件なし'}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-700">
                    {engineer?.name ?? '要員なし'}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-700">
                    {workRecord.workingHours}時間
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-700">
                    {workRecord.billingAmount.toLocaleString()}円
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-700">
                    {workRecord.paymentAmount.toLocaleString()}円
                  </td>

                  <td className="px-4 py-4 text-sm font-bold text-green-700">
                    {workRecord.grossProfit.toLocaleString()}円
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onOpenEdit(workRecord)}
                        className="rounded bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700"
                      >
                        編集
                      </button>

                      <button
                        onClick={() => {
                          const ok = window.confirm(
                            'この稼働実績を削除しますか？',
                          )

                          if (ok) {
                            onDelete(workRecord.id)
                          }
                        }}
                        className="rounded bg-red-100 px-3 py-1 text-xs font-bold text-red-700"
                      >
                        削除
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}

            {workRecords.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  登録されている稼働実績がありません。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}