import { useState } from 'react'
import type {
  ProposalHistory,
  ProposalStatus,
} from './proposalTypes'
import type { Project } from '../projects/projectTypes'
import type { Engineer } from '../engineers/engineerTypes'

type Props = {
  projects: Project[]
  engineers: Engineer[]
  projectId: number
  engineerId: number
  onBack: () => void
  onCreate: (proposalHistory: ProposalHistory) => void
}

export default function ProposalHistoryCreatePage({
  projects,
  engineers,
  projectId,
  engineerId,
  onBack,
  onCreate,
}: Props) {
  const project = projects.find((project) => project.id === projectId)

  const engineer = engineers.find(
    (engineer) => engineer.id === engineerId,
  )

  const [proposedDate, setProposedDate] = useState('2026-05-28')
  const [interviewDate, setInterviewDate] = useState('')
  const [status, setStatus] = useState<ProposalStatus>('提案中')
  const [interviewResult, setInterviewResult] = useState('')
  const [memo, setMemo] = useState('')

  if (!project || !engineer) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="text-2xl font-bold text-gray-900">
          提案対象が見つかりません
        </h2>

        <p className="mt-2 text-gray-600">
          案件または要員データが見つかりませんでした。
        </p>

        <button
          onClick={onBack}
          className="mt-4 rounded bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700"
        >
          マッチング画面へ戻る
        </button>
      </div>
    )
  }

  const handleSubmit = () => {
  if (!project) {
    alert('案件が見つかりません。')
    return
  }

  if (!engineer) {
    alert('要員が見つかりません。')
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
    projectId: project.id,
    engineerId: engineer.id,
    proposedDate,
    interviewDate,
    interviewResult,
    status,
    memo,
  }

  onCreate(newProposalHistory)
}

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={onBack}
          className="mb-3 rounded bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700"
        >
          ← マッチング画面へ戻る
        </button>

        <h2 className="text-2xl font-bold text-gray-900">提案履歴登録</h2>

        <p className="mt-1 text-sm text-gray-500">
          マッチング結果から選択した案件・要員で提案履歴を作成します。
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-5 shadow">
          <h3 className="font-bold text-gray-900">案件情報</h3>

          <p className="mt-3 text-sm font-bold text-gray-700">
            {project.title}
          </p>

          <p className="mt-2 text-sm text-gray-600">
            {project.description}
          </p>

          <p className="mt-2 text-sm text-gray-700">
            勤務地：{project.location}
          </p>

          <p className="mt-1 text-sm text-gray-700">
            単価：{project.unitPrice.toLocaleString()}円
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <span
                key={skill.id}
                className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <h3 className="font-bold text-gray-900">要員情報</h3>

          <p className="mt-3 text-sm font-bold text-gray-700">
            {engineer.name}
          </p>

          <p className="mt-2 text-sm text-gray-600">
            {engineer.companyName} / {engineer.age}歳 / {engineer.gender}
          </p>

          <p className="mt-2 text-sm text-gray-700">
            希望単価：{engineer.desiredUnitPrice.toLocaleString()}円
          </p>

          <p className="mt-1 text-sm text-gray-700">
            経験年数：{engineer.experienceYears}年
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
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
      </div>

      <div className="mt-6 rounded-xl bg-white p-6 shadow">
        <h3 className="mb-4 text-lg font-bold text-gray-900">提案内容</h3>

        <div className="grid gap-4">
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
              type="text"
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
            onClick={onBack}
            className="rounded bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  )
}