import { useState } from 'react'
import type { Project } from '../projects/projectTypes'
import type { Engineer } from '../engineers/engineerTypes'

type WorkRecordFormValues = {
  projectId: number
  engineerId: number
  targetMonth: string
  workingHours: number
  billingAmount: number
  paymentAmount: number
  memo: string
}

type Props = {
  projects: Project[]
  engineers: Engineer[]
  initialValues?: WorkRecordFormValues
  onSubmit: (values: WorkRecordFormValues) => void
  submitLabel: string
  onCancel: () => void
}

export type { WorkRecordFormValues }

export default function WorkRecordForm({
  projects,
  engineers,
  initialValues,
  onSubmit,
  submitLabel,
  onCancel,
}: Props) {
  const [projectId, setProjectId] = useState(
  initialValues?.projectId ?? 0,
)

  const [engineerId, setEngineerId] = useState(
  initialValues?.engineerId ?? 0,
)

  const [targetMonth, setTargetMonth] = useState(
    initialValues?.targetMonth ?? '2026-05',
  )

  const [workingHours, setWorkingHours] = useState(
    initialValues?.workingHours ?? 0,
  )

  const [billingAmount, setBillingAmount] = useState(
    initialValues?.billingAmount ?? 0,
  )

  const [paymentAmount, setPaymentAmount] = useState(
  initialValues?.paymentAmount?.toString() ?? '',
)

  const [memo, setMemo] = useState(initialValues?.memo ?? '')

  const grossProfit = billingAmount - Number(paymentAmount || 0)

  const handleSubmit = () => {
  if (projectId === 0) {
    alert('案件を選択してください。')
    return
  }

  if (engineerId === 0) {
    alert('要員を選択してください。')
    return
  }

  if (targetMonth.trim() === '') {
    alert('対象月を入力してください。')
    return
  }

  if (workingHours <= 0) {
    alert('稼働時間は1時間以上で入力してください。')
    return
  }

  if (billingAmount <= 0) {
    alert('請求額は1円以上で入力してください。')
    return
  }

  if (paymentAmount.trim() === '') {
  alert('支払額を入力してください。')
  return
}

if (Number(paymentAmount) < 0) {
  alert('支払額は0円以上で入力してください。')
  return
}

if (Number(paymentAmount) > billingAmount) {
  alert('支払額が請求額を超えています。金額を確認してください。')
  return
}

  onSubmit({
    projectId,
    engineerId,
    targetMonth,
    workingHours,
    billingAmount,
    paymentAmount: Number(paymentAmount),
    memo,
  })
}

  return (
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

            {engineers.length === 0 && (
              <option value={0}>要員がありません</option>
            )}

            {engineers.map((engineer) => (
              <option key={engineer.id} value={engineer.id}>
                {engineer.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-gray-700">
            対象月
          </label>

          <input
            type="month"
            value={targetMonth}
            onChange={(event) => setTargetMonth(event.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-gray-700">
            稼働時間
          </label>

          <input
            type="number"
            value={workingHours}
            onChange={(event) => setWorkingHours(Number(event.target.value))}
            className="w-full rounded border border-gray-300 px-3 py-2"
            placeholder="例：160"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-gray-700">
            請求額
          </label>

          <input
            type="number"
            value={billingAmount}
            onChange={(event) => setBillingAmount(Number(event.target.value))}
            className="w-full rounded border border-gray-300 px-3 py-2"
            placeholder="例：750000"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-gray-700">
            支払額
          </label>

          <input
  type="number"
  value={paymentAmount}
  onChange={(event) => setPaymentAmount(event.target.value)}
  className="w-full rounded border border-gray-300 px-3 py-2"
  placeholder="例：550000"
/>
        </div>

        <div className="rounded bg-green-50 p-4">
          <p className="text-sm font-bold text-green-700">粗利</p>

          <p className="mt-1 text-2xl font-bold text-green-800">
            {grossProfit.toLocaleString()}円
          </p>

          <p className="mt-1 text-xs text-green-700">
            請求額 - 支払額 で自動計算しています。
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-gray-700">
            メモ
          </label>

          <textarea
            value={memo}
            onChange={(event) => setMemo(event.target.value)}
            className="min-h-28 w-full rounded border border-gray-300 px-3 py-2"
            placeholder="稼働実績のメモを入力"
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