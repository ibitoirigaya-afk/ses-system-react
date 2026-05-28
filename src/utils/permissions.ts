import type { User } from '../features/auth/authTypes'
import type { Project } from '../features/projects/projectTypes'
import type { Engineer } from '../features/engineers/engineerTypes'
import type { ProposalHistory } from '../features/proposals/proposalTypes'

export function canViewProject(user: User, project: Project) {
  if (user.role === 'admin') return true
  if (user.role === 'user') return true
  if (user.role === 'company') return project.userId === user.id

  return false
}

export function canEditProject(user: User, project: Project) {
  if (user.role === 'admin') return true
  if (user.role === 'company') return project.userId === user.id

  return false
}

export function canViewEngineer(user: User, engineer: Engineer) {
  if (user.role === 'admin') return true
  if (user.role === 'user') return engineer.userId === user.id

  return false
}

export function canEditEngineer(user: User, engineer: Engineer) {
  if (user.role === 'admin') return true
  if (user.role === 'user') return engineer.userId === user.id

  return false
}

export function canUseMatching(user: User, project: Project) {
  if (user.role === 'admin') return true
  if (user.role === 'company') return project.userId === user.id

  return false
}

export function canViewProposalHistory(
  user: User,
  proposalHistory: ProposalHistory,
  projects: Project[],
  engineers: Engineer[],
) {
  if (user.role === 'admin') return true

  const project = projects.find(
    (project) => project.id === proposalHistory.projectId,
  )

  const engineer = engineers.find(
    (engineer) => engineer.id === proposalHistory.engineerId,
  )

  if (user.role === 'company') {
    return project?.userId === user.id
  }

  if (user.role === 'user') {
    return engineer?.userId === user.id
  }

  return false
}