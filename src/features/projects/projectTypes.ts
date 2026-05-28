import type { Skill } from '../skills/skillTypes'

export type ProjectStatus = '募集中' | '提案中' | '成約' | '終了'

export type Project = {
  id: number
  userId: number
  title: string
  description: string
  location: string
  unitPrice: number
  status: ProjectStatus
  skills: Skill[]
}