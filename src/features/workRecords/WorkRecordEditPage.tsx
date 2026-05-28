import type { Project } from '../projects/projectTypes'
import type { Engineer } from '../engineers/engineerTypes'
import type { WorkRecord } from './workRecordTypes'
import WorkRecordForm, { type WorkRecordFormValues } from './WorkRecordForm'

type Props = {
  projects: Project[]
  engineers: Engineer[]
  workRecord: WorkRecord
  onUpdate: (workRecord: WorkRecord) => void
  onCancel: () => void
}

export default function WorkRecordEditPage({
  projects,
  engineers,
  workRecord,
  onUpdate,
  onCancel,
}: Props) {
  const handleSubmit = (values: WorkRecordFormValues) => {
    const updatedWorkRecord: WorkRecord = {
      ...workRecord,
      projectId: values.projectId,
      engineerId: values.engineerId,
      targetMonth: values.targetMonth,
      workingHours: values.workingHours,
      billingAmount: values.billingAmount,
      paymentAmount: values.paymentAmount,
      grossProfit: values.billingAmount - values.paymentAmount,
      memo: values.memo,
    }

    onUpdate(updatedWorkRecord)
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={onCancel}
          className="mb-3 rounded bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700"
        >
          ← 稼働実績一覧へ戻る
        </button>

        <h2 className="text-2xl font-bold text-gray-900">稼働実績編集</h2>

        <p className="mt-1 text-sm text-gray-500">
          稼働時間・請求額・支払額・メモを編集します。
        </p>
      </div>

      <WorkRecordForm
        projects={projects}
        engineers={engineers}
        submitLabel="更新する"
        onSubmit={handleSubmit}
        onCancel={onCancel}
        initialValues={{
          projectId: workRecord.projectId,
          engineerId: workRecord.engineerId,
          targetMonth: workRecord.targetMonth,
          workingHours: workRecord.workingHours,
          billingAmount: workRecord.billingAmount,
          paymentAmount: workRecord.paymentAmount,
          memo: workRecord.memo,
        }}
      />
    </div>
  )
}