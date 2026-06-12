import { useEffect, useState } from 'react'
import type { ProposalHistory } from '../features/proposals/proposalTypes'

const API_BASE_URL = 'http://127.0.0.1:8000/api'

type ApiProposalHistory = {
  id: number
  project_id: number
  engineer_id: number
  proposed_date: string
  interview_date: string | null
  interview_result: string | null
  status: ProposalHistory['status']
  memo: string | null
  deleted_at: string | null
  created_at: string
  updated_at: string
}

const convertApiProposalHistoryToProposalHistory = (
  apiProposalHistory: ApiProposalHistory,
): ProposalHistory => {
  return {
    id: apiProposalHistory.id,
    projectId: apiProposalHistory.project_id,
    engineerId: apiProposalHistory.engineer_id,
    proposedDate: apiProposalHistory.proposed_date.slice(0, 10),
    interviewDate: apiProposalHistory.interview_date
      ? apiProposalHistory.interview_date.slice(0, 10)
      : '',
    interviewResult: apiProposalHistory.interview_result ?? '',
    status: apiProposalHistory.status,
    memo: apiProposalHistory.memo ?? '',
    deletedAt: apiProposalHistory.deleted_at,
  }
}

export function useProposalHistories() {
  const [proposalHistories, setProposalHistories] = useState<
    ProposalHistory[]
  >([])
  const [isLoadingProposalHistories, setIsLoadingProposalHistories] =
    useState(true)
  const [proposalHistoryError, setProposalHistoryError] = useState('')

  useEffect(() => {
    const fetchProposalHistories = async () => {
      try {
        setIsLoadingProposalHistories(true)
        setProposalHistoryError('')

        const response = await fetch(`${API_BASE_URL}/proposal-histories`)

        if (!response.ok) {
          throw new Error('提案履歴一覧の取得に失敗しました。')
        }

        const data: ApiProposalHistory[] = await response.json()
        const convertedProposalHistories = data.map(
          convertApiProposalHistoryToProposalHistory,
        )

        setProposalHistories(convertedProposalHistories)
      } catch (error) {
        console.error(error)
        setProposalHistoryError('提案履歴一覧の取得に失敗しました。')
      } finally {
        setIsLoadingProposalHistories(false)
      }
    }

    fetchProposalHistories()
  }, [])

  const createProposalHistory = async (proposalHistory: ProposalHistory) => {
    try {
      setProposalHistoryError('')

      const response = await fetch(`${API_BASE_URL}/proposal-histories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: proposalHistory.projectId,
          engineer_id: proposalHistory.engineerId,
          proposed_date: proposalHistory.proposedDate,
          interview_date: proposalHistory.interviewDate || null,
          interview_result: proposalHistory.interviewResult || null,
          status: proposalHistory.status,
          memo: proposalHistory.memo || null,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)

        throw new Error(
          errorData?.message ?? '提案履歴の登録に失敗しました。',
        )
      }

      const createdProposalHistory: ApiProposalHistory = await response.json()
      const convertedProposalHistory =
        convertApiProposalHistoryToProposalHistory(createdProposalHistory)

      setProposalHistories((prev) => [convertedProposalHistory, ...prev])
    } catch (error) {
      console.error(error)
      setProposalHistoryError(
        error instanceof Error
          ? error.message
          : '提案履歴の登録に失敗しました。',
      )
    }
  }

  const updateProposalHistory = async (
    updatedProposalHistory: ProposalHistory,
  ) => {
    try {
      setProposalHistoryError('')

      const response = await fetch(
        `${API_BASE_URL}/proposal-histories/${updatedProposalHistory.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            project_id: updatedProposalHistory.projectId,
            engineer_id: updatedProposalHistory.engineerId,
            proposed_date: updatedProposalHistory.proposedDate,
            interview_date: updatedProposalHistory.interviewDate || null,
            interview_result: updatedProposalHistory.interviewResult || null,
            status: updatedProposalHistory.status,
            memo: updatedProposalHistory.memo || null,
          }),
        },
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)

        throw new Error(
          errorData?.message ?? '提案履歴の更新に失敗しました。',
        )
      }

      const savedProposalHistory: ApiProposalHistory = await response.json()
      const convertedProposalHistory =
        convertApiProposalHistoryToProposalHistory(savedProposalHistory)

      setProposalHistories((prev) =>
        prev.map((proposalHistory) =>
          proposalHistory.id === convertedProposalHistory.id
            ? convertedProposalHistory
            : proposalHistory,
        ),
      )
    } catch (error) {
      console.error(error)
      setProposalHistoryError(
        error instanceof Error
          ? error.message
          : '提案履歴の更新に失敗しました。',
      )
    }
  }

  const deleteProposalHistory = async (proposalHistoryId: number) => {
    try {
      setProposalHistoryError('')

      const response = await fetch(
        `${API_BASE_URL}/proposal-histories/${proposalHistoryId}`,
        {
          method: 'DELETE',
        },
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)

        throw new Error(
          errorData?.message ?? '提案履歴の削除に失敗しました。',
        )
      }

      setProposalHistories((prev) =>
        prev.map((proposalHistory) =>
          proposalHistory.id === proposalHistoryId
            ? {
              ...proposalHistory,
              deletedAt: new Date().toISOString(),
            }
            : proposalHistory,
        ),
      )
    } catch (error) {
      console.error(error)
      setProposalHistoryError(
        error instanceof Error
          ? error.message
          : '提案履歴の削除に失敗しました。',
      )
    }
  }

  const restoreProposalHistory = async (proposalHistoryId: number) => {
    try {
      setProposalHistoryError('')

      const response = await fetch(
        `${API_BASE_URL}/proposal-histories/${proposalHistoryId}/restore`,
        {
          method: 'PATCH',
        },
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)

        throw new Error(
          errorData?.message ?? '提案履歴の復元に失敗しました。',
        )
      }

      const restoredProposalHistory: ApiProposalHistory = await response.json()
      const convertedProposalHistory =
        convertApiProposalHistoryToProposalHistory(restoredProposalHistory)

      setProposalHistories((prev) =>
        prev.map((proposalHistory) =>
          proposalHistory.id === convertedProposalHistory.id
            ? convertedProposalHistory
            : proposalHistory,
        ),
      )
    } catch (error) {
      console.error(error)
      setProposalHistoryError(
        error instanceof Error
          ? error.message
          : '提案履歴の復元に失敗しました。',
      )
    }
  }

  return {
    proposalHistories,
    isLoadingProposalHistories,
    proposalHistoryError,
    createProposalHistory,
    updateProposalHistory,
    deleteProposalHistory,
    restoreProposalHistory,
  }
}