export type ProposalStatus =
  | '提案中'
  | '面談調整中'
  | '面談予定'
  | '面談済み'
  | '成約'
  | '見送り'

export type ProposalHistory = {
  id: number
  projectId: number
  engineerId: number
  proposedDate: string
  interviewDate: string
  interviewResult: string
  status: ProposalStatus
  memo: string
  deletedAt?: string | null
}