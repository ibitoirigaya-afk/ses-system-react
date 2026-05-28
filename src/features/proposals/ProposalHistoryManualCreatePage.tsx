import { useState } from 'react'
import type { Project } from '../projects/projectTypes'
import type { Engineer } from '../engineers/engineerTypes'
import type { ProposalHistory, ProposalStatus } from './proposalTypes'

type Props = {
  projects: Project[]
  engineers: Engineer[]
  onCreate: (proposalHistory: ProposalHistory) => void
  onCancel: () => void
}

export default function ProposalHistoryManualCreatePage({
  projects,
  engineers,
  onCreate,
  onCancel,
}: Props) {
  const [projectId, setProjectId] = useState(0)
  const [engineerId, setEngineerId] = useState(0)
  const [proposedDate, setProposedDate] = useState(
    new Date().toISOString().slice(0, 10),
  )
  const [interviewDate, setInterviewDate] = useState('')
  const [status, setStatus] = useState<ProposalStatus>('提案中')
  const [interviewResult, setInterviewResult] = useState('')
  const [memo, setMemo] = useState('')

  const handleSubmit = () => {
  if (projectId === 0) {
    alert('案件を選択してください。')
    return
  }

  if (engineerId === 0) {
    alert('要員を選択してください。')
    return
  }

  if (proposedDate.trim() === '') {
    alert('提案日を入力してください。')
    return
  }

  if (status.trim() === '') {
    alert('ステータスを選択してください。')
    return
  }

  const newProposalHistory: ProposalHistory = {
    id: Date.now(),
    projectId,
    engineerId,
    proposedDate,
    interviewDate,
    interviewResult,
    status,
    memo,
  }

  onCreate(newProposalHistory)
}

  if (projects.length === 0 || engineers.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="text-2xl font-bold text-gray-900">
          提案履歴を登録できません
        </h2>

        <p className="mt-2 text-gray-600">
          案件または要員が登録されていないため、提案履歴を作成できません。
        </p>

        <button
          onClick={onCancel}
          className="mt-4 rounded bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700"
        >
          提案履歴一覧へ戻る
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={onCancel}
          className="mb-3 rounded bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700"
        >
          ← 提案履歴一覧へ戻る
        </button>

        <h2 className="text-2xl font-bold text-gray-900">提案履歴登録</h2>

        <p className="mt-1 text-sm text-gray-500">
          案件と要員を選択して、提案履歴を登録します。
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <div className="grid gap-4">
          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">
              案件
            </label>
            <select
  value={projectId}
  onChange={(event) => setProjectId(Number(event.target.value))}
  className="w-full rounded border border-gray-300 px-3 py-2"
>
  <option value={0}>案件を選択してください</option>

  {projects.map((project) => (
    <option key={project.id} value={project.id}>
      {project.title}
    </option>
  ))}
</select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">
              要員
            </label>
            <select
  value={engineerId}
  onChange={(event) => setEngineerId(Number(event.target.value))}
  className="w-full rounded border border-gray-300 px-3 py-2"
>
  <option value={0}>要員を選択してください</option>

  {engineers.map((engineer) => (
    <option key={engineer.id} value={engineer.id}>
      {engineer.name}
    </option>
  ))}
</select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">
              提案日
            </label>
            <input
              type="date"
              value={proposedDate}
              onChange={(event) => setProposedDate(event.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">
              面談日
            </label>
            <input
              type="date"
              value={interviewDate}
              onChange={(event) => setInterviewDate(event.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">
              ステータス
            </label>
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as ProposalStatus)
              }
              className="w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="提案中">提案中</option>
              <option value="面談調整中">面談調整中</option>
              <option value="面談予定">面談予定</option>
              <option value="面談済み">面談済み</option>
              <option value="成約">成約</option>
              <option value="見送り">見送り</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">
              面談結果
            </label>
            <input
              value={interviewResult}
              onChange={(event) => setInterviewResult(event.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2"
              placeholder="例：結果待ち、面談予定、見送り理由など"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">
              メモ
            </label>
            <textarea
              value={memo}
              onChange={(event) => setMemo(event.target.value)}
              className="min-h-28 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="提案時のメモを入力"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleSubmit}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-bold text-white"
          >
            登録する
          </button>

          <button
            onClick={onCancel}
            className="rounded bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  )
}