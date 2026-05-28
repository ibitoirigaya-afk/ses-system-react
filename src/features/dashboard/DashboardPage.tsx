import type { User } from '../auth/authTypes'
import type { Project } from '../projects/projectTypes'
import type { Engineer } from '../engineers/engineerTypes'
import type { ProposalHistory } from '../proposals/proposalTypes'
import type { WorkRecord } from '../workRecords/workRecordTypes'

type Page =
  | 'top'
  | 'projects'
  | 'engineers'
  | 'skills'
  | 'proposals'
  | 'workRecords'

type Props = {
  currentUser: User
  projects: Project[]
  engineers: Engineer[]
  proposalHistories: ProposalHistory[]
  workRecords: WorkRecord[]
  onChangePage: (page: Page) => void
}

export default function DashboardPage({
  currentUser,
  projects,
  engineers,
  proposalHistories,
  workRecords,
  onChangePage,
}: Props) {
  const totalGrossProfit = workRecords.reduce(
    (total, workRecord) => total + workRecord.grossProfit,
    0,
  )

  const activeProjects = projects.filter(
    (project) => project.status === '募集中' || project.status === '提案中',
  )

  const availableEngineers = engineers.filter(
    (engineer) => engineer.status === '稼働可能',
  )

  const contractedProposals = proposalHistories.filter(
    (proposalHistory) => proposalHistory.status === '成約',
  )

  const userEngineers = engineers.filter(
    (engineer) => engineer.userId === currentUser.id,
  )

  const userProposalHistories = proposalHistories.filter((proposalHistory) => {
    const engineer = engineers.find(
      (engineer) => engineer.id === proposalHistory.engineerId,
    )

    return engineer?.userId === currentUser.id
  })

  const userAvailableEngineers = userEngineers.filter(
    (engineer) => engineer.status === '稼働可能',
  )

  const companyProjects = projects.filter(
    (project) => project.userId === currentUser.id,
  )

  const companyProposalHistories = proposalHistories.filter(
    (proposalHistory) => {
      const project = projects.find(
        (project) => project.id === proposalHistory.projectId,
      )

      return project?.userId === currentUser.id
    },
  )

  const companyActiveProjects = companyProjects.filter(
    (project) => project.status === '募集中' || project.status === '提案中',
  )

  if (currentUser.role === 'user') {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">要員担当TOP</h2>
          <p className="mt-1 text-sm text-gray-500">
            自分が登録した要員と提案状況を確認できます。
          </p>
        </div>

        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <p className="text-sm font-bold text-gray-500">ログイン中ユーザー</p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <p className="text-xl font-bold text-gray-900">
              {currentUser.name}
            </p>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
              {currentUser.role}
            </span>

            <span className="text-sm text-gray-500">{currentUser.email}</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm font-bold text-gray-500">自分の要員数</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {userEngineers.length}
            </p>
            <p className="mt-1 text-sm text-gray-500">登録済みの要員</p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm font-bold text-gray-500">稼働可能要員</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {userAvailableEngineers.length}
            </p>
            <p className="mt-1 text-sm text-gray-500">すぐ提案できる要員</p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm font-bold text-gray-500">自分の提案履歴</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {userProposalHistories.length}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              自分の要員に関係する提案
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-white p-6 shadow">
          <p className="text-sm font-bold text-gray-500">ショートカット</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => onChangePage('projects')}
              className="rounded bg-blue-600 px-4 py-3 text-sm font-bold text-white"
            >
              案件を見る
            </button>

            <button
              onClick={() => onChangePage('engineers')}
              className="rounded bg-blue-600 px-4 py-3 text-sm font-bold text-white"
            >
              要員を見る
            </button>

            <button
              onClick={() => onChangePage('proposals')}
              className="rounded bg-blue-600 px-4 py-3 text-sm font-bold text-white"
            >
              提案履歴を見る
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-white p-6 shadow">
          <h3 className="text-lg font-bold text-gray-900">
            自分の要員に関係する最近の提案
          </h3>

          <div className="mt-4 overflow-hidden rounded-lg border">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                    提案日
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                    ステータス
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                    メモ
                  </th>
                </tr>
              </thead>

              <tbody>
                {userProposalHistories.slice(0, 5).map((proposalHistory) => (
                  <tr key={proposalHistory.id} className="border-t">
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {proposalHistory.proposedDate}
                    </td>

                    <td className="px-4 py-3">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                        {proposalHistory.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">
                      {proposalHistory.memo || 'メモなし'}
                    </td>
                  </tr>
                ))}

                {userProposalHistories.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-6 text-center text-sm text-gray-500"
                    >
                      自分の要員に関係する提案履歴がありません。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  if (currentUser.role === 'company') {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">企業担当TOP</h2>
          <p className="mt-1 text-sm text-gray-500">
            自社案件と提案状況を確認できます。
          </p>
        </div>

        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <p className="text-sm font-bold text-gray-500">ログイン中ユーザー</p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <p className="text-xl font-bold text-gray-900">
              {currentUser.name}
            </p>

            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
              {currentUser.role}
            </span>

            <span className="text-sm text-gray-500">{currentUser.email}</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm font-bold text-gray-500">自社案件数</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {companyProjects.length}
            </p>
            <p className="mt-1 text-sm text-gray-500">自分が登録した案件</p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm font-bold text-gray-500">
              募集中・提案中案件
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {companyActiveProjects.length}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              現在動いている案件
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm font-bold text-gray-500">
              自社案件の提案履歴
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {companyProposalHistories.length}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              自社案件に対する提案
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-white p-6 shadow">
          <p className="text-sm font-bold text-gray-500">ショートカット</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => onChangePage('projects')}
              className="rounded bg-blue-600 px-4 py-3 text-sm font-bold text-white"
            >
              自社案件を見る
            </button>

            <button
              onClick={() => onChangePage('proposals')}
              className="rounded bg-blue-600 px-4 py-3 text-sm font-bold text-white"
            >
              提案履歴を見る
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-white p-6 shadow">
          <h3 className="text-lg font-bold text-gray-900">
            自社案件に関係する最近の提案
          </h3>

          <div className="mt-4 overflow-hidden rounded-lg border">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                    提案日
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                    ステータス
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                    メモ
                  </th>
                </tr>
              </thead>

              <tbody>
                {companyProposalHistories.slice(0, 5).map((proposalHistory) => (
                  <tr key={proposalHistory.id} className="border-t">
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {proposalHistory.proposedDate}
                    </td>

                    <td className="px-4 py-3">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                        {proposalHistory.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">
                      {proposalHistory.memo || 'メモなし'}
                    </td>
                  </tr>
                ))}

                {companyProposalHistories.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-6 text-center text-sm text-gray-500"
                    >
                      自社案件に関係する提案履歴がありません。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">管理者TOP</h2>
        <p className="mt-1 text-sm text-gray-500">
          システム全体の状況を確認できます。
        </p>
      </div>

      <div className="mb-6 rounded-xl bg-white p-6 shadow">
        <p className="text-sm font-bold text-gray-500">ログイン中ユーザー</p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <p className="text-xl font-bold text-gray-900">
            {currentUser.name}
          </p>

          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
            {currentUser.role}
          </span>

          <span className="text-sm text-gray-500">{currentUser.email}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm font-bold text-gray-500">案件数</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {projects.length}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            募集中・提案中：{activeProjects.length}件
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm font-bold text-gray-500">要員数</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {engineers.length}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            稼働可能：{availableEngineers.length}名
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm font-bold text-gray-500">提案履歴数</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {proposalHistories.length}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            成約：{contractedProposals.length}件
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm font-bold text-gray-500">稼働実績数</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {workRecords.length}
          </p>
          <p className="mt-1 text-sm text-gray-500">登録済み実績</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm font-bold text-gray-500">粗利合計</p>
          <p className="mt-2 text-4xl font-bold text-green-700">
            {totalGrossProfit.toLocaleString()}円
          </p>
          <p className="mt-2 text-sm text-gray-500">
            稼働実績の「請求額 - 支払額」の合計です。
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm font-bold text-gray-500">ショートカット</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => onChangePage('projects')}
              className="rounded bg-blue-600 px-4 py-3 text-sm font-bold text-white"
            >
              案件を見る
            </button>

            <button
              onClick={() => onChangePage('engineers')}
              className="rounded bg-blue-600 px-4 py-3 text-sm font-bold text-white"
            >
              要員を見る
            </button>

            <button
              onClick={() => onChangePage('proposals')}
              className="rounded bg-blue-600 px-4 py-3 text-sm font-bold text-white"
            >
              提案履歴を見る
            </button>

            <button
              onClick={() => onChangePage('workRecords')}
              className="rounded bg-blue-600 px-4 py-3 text-sm font-bold text-white"
            >
              稼働実績を見る
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}