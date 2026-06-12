import { useEffect, useState } from 'react'
import type { WorkRecord } from '../features/workRecords/workRecordTypes'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type ApiWorkRecord = {
  id: number
  project_id: number
  engineer_id: number
  target_month: string
  working_hours: number
  billing_amount: number
  payment_amount: number
  gross_profit: number
  memo: string | null
  deleted_at: string | null
  created_at: string
  updated_at: string
}

const convertApiWorkRecordToWorkRecord = (
  apiWorkRecord: ApiWorkRecord,
): WorkRecord => {
  return {
    id: apiWorkRecord.id,
    projectId: apiWorkRecord.project_id,
    engineerId: apiWorkRecord.engineer_id,
    targetMonth: apiWorkRecord.target_month,
    workingHours: apiWorkRecord.working_hours,
    billingAmount: apiWorkRecord.billing_amount,
    paymentAmount: apiWorkRecord.payment_amount,
    grossProfit: apiWorkRecord.gross_profit,
    memo: apiWorkRecord.memo ?? '',
    deletedAt: apiWorkRecord.deleted_at,
  }
}

export function useWorkRecords() {
  const [workRecords, setWorkRecords] = useState<WorkRecord[]>([])
  const [isLoadingWorkRecords, setIsLoadingWorkRecords] = useState(true)
  const [workRecordError, setWorkRecordError] = useState('')

  useEffect(() => {
    const fetchWorkRecords = async () => {
      try {
        setIsLoadingWorkRecords(true)
        setWorkRecordError('')

        const response = await fetch(`${API_BASE_URL}/work-records`)

        if (!response.ok) {
          throw new Error('稼働実績一覧の取得に失敗しました。')
        }

        const data: ApiWorkRecord[] = await response.json()
        const convertedWorkRecords = data.map(convertApiWorkRecordToWorkRecord)

        setWorkRecords(convertedWorkRecords)
      } catch (error) {
        console.error(error)
        setWorkRecordError('稼働実績一覧の取得に失敗しました。')
      } finally {
        setIsLoadingWorkRecords(false)
      }
    }

    fetchWorkRecords()
  }, [])

  const createWorkRecord = async (workRecord: WorkRecord) => {
    try {
      setWorkRecordError('')

      const response = await fetch(`${API_BASE_URL}/work-records`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: workRecord.projectId,
          engineer_id: workRecord.engineerId,
          target_month: workRecord.targetMonth,
          working_hours: workRecord.workingHours,
          billing_amount: workRecord.billingAmount,
          payment_amount: workRecord.paymentAmount,
          gross_profit: workRecord.grossProfit,
          memo: workRecord.memo || null,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)

        throw new Error(
          errorData?.message ?? '稼働実績の登録に失敗しました。',
        )
      }

      const createdWorkRecord: ApiWorkRecord = await response.json()
      const convertedWorkRecord =
        convertApiWorkRecordToWorkRecord(createdWorkRecord)

      setWorkRecords((prev) => [convertedWorkRecord, ...prev])
    } catch (error) {
      console.error(error)
      setWorkRecordError(
        error instanceof Error
          ? error.message
          : '稼働実績の登録に失敗しました。',
      )
    }
  }

  const updateWorkRecord = async (updatedWorkRecord: WorkRecord) => {
    try {
      setWorkRecordError('')

      const response = await fetch(
        `${API_BASE_URL}/work-records/${updatedWorkRecord.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            project_id: updatedWorkRecord.projectId,
            engineer_id: updatedWorkRecord.engineerId,
            target_month: updatedWorkRecord.targetMonth,
            working_hours: updatedWorkRecord.workingHours,
            billing_amount: updatedWorkRecord.billingAmount,
            payment_amount: updatedWorkRecord.paymentAmount,
            gross_profit: updatedWorkRecord.grossProfit,
            memo: updatedWorkRecord.memo || null,
          }),
        },
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)

        throw new Error(
          errorData?.message ?? '稼働実績の更新に失敗しました。',
        )
      }

      const savedWorkRecord: ApiWorkRecord = await response.json()
      const convertedWorkRecord =
        convertApiWorkRecordToWorkRecord(savedWorkRecord)

      setWorkRecords((prev) =>
        prev.map((workRecord) =>
          workRecord.id === convertedWorkRecord.id
            ? convertedWorkRecord
            : workRecord,
        ),
      )
    } catch (error) {
      console.error(error)
      setWorkRecordError(
        error instanceof Error
          ? error.message
          : '稼働実績の更新に失敗しました。',
      )
    }
  }

  const deleteWorkRecord = async (workRecordId: number) => {
    try {
      setWorkRecordError('')

      const response = await fetch(
        `${API_BASE_URL}/work-records/${workRecordId}`,
        {
          method: 'DELETE',
        },
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)

        throw new Error(
          errorData?.message ?? '稼働実績の削除に失敗しました。',
        )
      }

      setWorkRecords((prev) =>
        prev.map((workRecord) =>
          workRecord.id === workRecordId
            ? {
              ...workRecord,
              deletedAt: new Date().toISOString(),
            }
            : workRecord,
        ),
      )
    } catch (error) {
      console.error(error)
      setWorkRecordError(
        error instanceof Error
          ? error.message
          : '稼働実績の削除に失敗しました。',
      )
    }
  }

  const restoreWorkRecord = async (workRecordId: number) => {
    try {
      setWorkRecordError('')

      const response = await fetch(
        `${API_BASE_URL}/work-records/${workRecordId}/restore`,
        {
          method: 'PATCH',
        },
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)

        throw new Error(
          errorData?.message ?? '稼働実績の復元に失敗しました。',
        )
      }

      const restoredWorkRecord: ApiWorkRecord = await response.json()
      const convertedWorkRecord =
        convertApiWorkRecordToWorkRecord(restoredWorkRecord)

      setWorkRecords((prev) =>
        prev.map((workRecord) =>
          workRecord.id === convertedWorkRecord.id
            ? convertedWorkRecord
            : workRecord,
        ),
      )
    } catch (error) {
      console.error(error)
      setWorkRecordError(
        error instanceof Error
          ? error.message
          : '稼働実績の復元に失敗しました。',
      )
    }
  }

  return {
    workRecords,
    isLoadingWorkRecords,
    workRecordError,
    createWorkRecord,
    updateWorkRecord,
    deleteWorkRecord,
    restoreWorkRecord,
  }
}