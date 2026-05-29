import { useEffect, useState } from 'react'
import type { ProposalHistory } from '../features/proposals/proposalTypes'
import { mockProposalHistories } from '../data/mockProposalHistories'
import { STORAGE_KEYS } from '../constants/storageKeys'
import { loadFromStorage, saveToStorage } from '../utils/storage'

export function useProposalHistories() {
  const [proposalHistories, setProposalHistories] = useState<
    ProposalHistory[]
  >(() =>
    loadFromStorage(
      STORAGE_KEYS.proposalHistories,
      mockProposalHistories,
    ),
  )

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.proposalHistories, proposalHistories)
  }, [proposalHistories])

  const createProposalHistory = (proposalHistory: ProposalHistory) => {
    setProposalHistories((prev) => [proposalHistory, ...prev])
  }

  const updateProposalHistory = (
    updatedProposalHistory: ProposalHistory,
  ) => {
    setProposalHistories((prev) =>
      prev.map((proposalHistory) =>
        proposalHistory.id === updatedProposalHistory.id
          ? updatedProposalHistory
          : proposalHistory,
      ),
    )
  }

  const deleteProposalHistory = (proposalHistoryId: number) => {
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
  }

  const restoreProposalHistory = (proposalHistoryId: number) => {
    setProposalHistories((prev) =>
      prev.map((proposalHistory) =>
        proposalHistory.id === proposalHistoryId
          ? {
              ...proposalHistory,
              deletedAt: null,
            }
          : proposalHistory,
      ),
    )
  }

  return {
    proposalHistories,
    createProposalHistory,
    updateProposalHistory,
    deleteProposalHistory,
    restoreProposalHistory,
  }
}