import { useEffect, useState } from 'react'
import type { Engineer } from '../features/engineers/engineerTypes'
import { mockEngineers } from '../data/mockEngineers'
import { STORAGE_KEYS } from '../constants/storageKeys'
import { loadFromStorage, saveToStorage } from '../utils/storage'

export function useEngineers() {
  const [engineers, setEngineers] = useState<Engineer[]>(() =>
    loadFromStorage(STORAGE_KEYS.engineers, mockEngineers),
  )

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.engineers, engineers)
  }, [engineers])

  const createEngineer = (engineer: Engineer) => {
    setEngineers((prev) => [engineer, ...prev])
  }

  const updateEngineer = (updatedEngineer: Engineer) => {
    setEngineers((prev) =>
      prev.map((engineer) =>
        engineer.id === updatedEngineer.id ? updatedEngineer : engineer,
      ),
    )
  }

  const deleteEngineer = (engineerId: number) => {
    setEngineers((prev) =>
      prev.map((engineer) =>
        engineer.id === engineerId
          ? {
              ...engineer,
              deletedAt: new Date().toISOString(),
            }
          : engineer,
      ),
    )
  }

  const restoreEngineer = (engineerId: number) => {
    setEngineers((prev) =>
      prev.map((engineer) =>
        engineer.id === engineerId
          ? {
              ...engineer,
              deletedAt: null,
            }
          : engineer,
      ),
    )
  }

  return {
    engineers,
    setEngineers,
    createEngineer,
    updateEngineer,
    deleteEngineer,
    restoreEngineer,
  }
}