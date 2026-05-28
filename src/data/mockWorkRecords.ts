import type { WorkRecord } from '../features/workRecords/workRecordTypes'

export const mockWorkRecords: WorkRecord[] = [
  {
    id: 1,
    projectId: 1,
    engineerId: 1,
    targetMonth: '2026-05',
    workingHours: 160,
    billingAmount: 750000,
    paymentAmount: 550000,
    grossProfit: 200000,
    memo: '5月分の稼働実績。',
  },
  {
    id: 2,
    projectId: 2,
    engineerId: 2,
    targetMonth: '2026-05',
    workingHours: 150,
    billingAmount: 700000,
    paymentAmount: 520000,
    grossProfit: 180000,
    memo: '5月分の稼働実績。',
  },
]