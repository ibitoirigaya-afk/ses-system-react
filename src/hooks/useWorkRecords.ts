import { useEffect, useState } from 'react'
import type { WorkRecord } from '../features/workRecords/workRecordTypes'
import { mockWorkRecords } from '../data/mockWorkRecords'
import { STORAGE_KEYS } from '../constants/storageKeys'
import { loadFromStorage, saveToStorage } from '../utils/storage'

export function useWorkRecords() {
  const [workRecords, setWorkRecords] = useState<WorkRecord[]>(() =>
    loadFromStorage(STORAGE_KEYS.workRecords, mockWorkRecords),
  )

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.workRecords, workRecords)
  }, [workRecords])

  const createWorkRecord = (workRecord: WorkRecord) => {
    setWorkRecords((prev) => [workRecord, ...prev])
  }

  const updateWorkRecord = (updatedWorkRecord: WorkRecord) => {
    setWorkRecords((prev) =>
      prev.map((workRecord) =>
        workRecord.id === updatedWorkRecord.id
          ? updatedWorkRecord
          : workRecord,
      ),
    )
  }

  const deleteWorkRecord = (workRecordId: number) => {
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
  }

  const restoreWorkRecord = (workRecordId: number) => {
    setWorkRecords((prev) =>
      prev.map((workRecord) =>
        workRecord.id === workRecordId
          ? {
              ...workRecord,
              deletedAt: null,
            }
          : workRecord,
      ),
    )
  }

  return {
    workRecords,
    createWorkRecord,
    updateWorkRecord,
    deleteWorkRecord,
    restoreWorkRecord,
  }
}