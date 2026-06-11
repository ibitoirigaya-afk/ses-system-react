import { useEffect, useState } from 'react'
import type { User } from './features/auth/authTypes'
import type { Project } from './features/projects/projectTypes'
import type { ProposalHistory } from './features/proposals/proposalTypes'
import type { Engineer } from './features/engineers/engineerTypes'
import type { Skill } from './features/skills/skillTypes'
import type { WorkRecord } from './features/workRecords/workRecordTypes'
import Layout from './components/Layout'
import LoginPage from './features/auth/LoginPage'
import RegisterPage from './features/auth/RegisterPage'
import ProjectListPage from './features/projects/ProjectListPage'
import ProjectDetailPage from './features/projects/ProjectDetailPage'
import ProjectMatchingPage from './features/projects/ProjectMatchingPage'
import ProjectCreatePage from './features/projects/ProjectCreatePage'
import ProjectEditPage from './features/projects/ProjectEditPage'
import EngineerListPage from './features/engineers/EngineerListPage'
import EngineerDetailPage from './features/engineers/EngineerDetailPage'
import EngineerCreatePage from './features/engineers/EngineerCreatePage'
import EngineerEditPage from './features/engineers/EngineerEditPage'
import SkillListPage from './features/skills/SkillListPage'
import SkillCreatePage from './features/skills/SkillCreatePage'
import SkillEditPage from './features/skills/SkillEditPage'
import ProposalHistoryListPage from './features/proposals/ProposalHistoryListPage'
import ProposalHistoryCreatePage from './features/proposals/ProposalHistoryCreatePage'
import ProposalHistoryDetailPage from './features/proposals/ProposalHistoryDetailPage'
import ProposalHistoryEditPage from './features/proposals/ProposalHistoryEditPage'
import ProposalHistoryManualCreatePage from './features/proposals/ProposalHistoryManualCreatePage'
import WorkRecordListPage from './features/workRecords/WorkRecordListPage'
import WorkRecordCreatePage from './features/workRecords/WorkRecordCreatePage'
import WorkRecordEditPage from './features/workRecords/WorkRecordEditPage'
import DashboardPage from './features/dashboard/DashboardPage'

import {
  loadFromStorage,
  saveToStorage,
} from './utils/storage'
import { STORAGE_KEYS } from './constants/storageKeys'
import {
  getEngineerStatusByProposalStatus,
  getProjectStatusByProposalStatus,
} from './utils/proposalStatusSync'
import { useProjects } from './hooks/useProjects'
import { useEngineers } from './hooks/useEngineers'
import { useSkills } from './hooks/useSkills'
import { useWorkRecords } from './hooks/useWorkRecords'
import { useProposalHistories } from './hooks/useProposalHistories'
import { useAuthUsers } from './hooks/useAuthUsers'

type Page =
  | 'top'
  | 'projects'
  | 'engineers'
  | 'skills'
  | 'proposals'
  | 'workRecords'

type AuthMode = 'login' | 'register'

type CreatingProposal = {
  projectId: number
  engineerId: number
}

export default function App() {
  const [authMode, setAuthMode] = useState<AuthMode>('login')

  const {
    projects,
    setProjects,
    createProject,
    updateProject,
    deleteProject,
    restoreProject,
  } = useProjects()

  const {
    engineers,
    setEngineers,
    createEngineer,
    updateEngineer,
    deleteEngineer,
    restoreEngineer,
  } = useEngineers()

  const {
    skills,
    createSkill,
    updateSkill,
    deleteSkill,
  } = useSkills()

  const {
    workRecords,
    createWorkRecord,
    updateWorkRecord,
    deleteWorkRecord,
    restoreWorkRecord,
  } = useWorkRecords()

  const {
    proposalHistories,
    createProposalHistory,
    updateProposalHistory,
    deleteProposalHistory,
    restoreProposalHistory,
  } = useProposalHistories()

  const {
    users,
    currentUser,
    login,
    register,
    logout,
  } = useAuthUsers()

  const [currentPage, setCurrentPage] = useState<Page>(() =>
    loadFromStorage(STORAGE_KEYS.currentPage, 'top'),
  )

  const [isCreatingProject, setIsCreatingProject] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  )

  const [isCreatingEngineer, setIsCreatingEngineer] = useState(false)
  const [selectedEngineer, setSelectedEngineer] = useState<Engineer | null>(
    null,
  )
  const [editingEngineer, setEditingEngineer] = useState<Engineer | null>(null)

  const [isCreatingSkill, setIsCreatingSkill] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)

  const [isCreatingWorkRecord, setIsCreatingWorkRecord] = useState(false)
  const [editingWorkRecord, setEditingWorkRecord] =
    useState<WorkRecord | null>(null)

  const [creatingProposal, setCreatingProposal] =
    useState<CreatingProposal | null>(null)

  const [selectedProposalHistory, setSelectedProposalHistory] =
    useState<ProposalHistory | null>(null)

  const [editingProposalHistory, setEditingProposalHistory] =
    useState<ProposalHistory | null>(null)

  const [isCreatingProposalHistory, setIsCreatingProposalHistory] =
    useState(false)

  useEffect(() => {
    saveToStorage('ses-current-page', currentPage)
  }, [currentPage])

  const resetPageState = () => {
    setIsCreatingProject(false)
    setSelectedProject(null)
    setEditingProject(null)
    setSelectedProjectId(null)

    setIsCreatingEngineer(false)
    setSelectedEngineer(null)
    setEditingEngineer(null)

    setIsCreatingProposalHistory(false)

    setIsCreatingSkill(false)
    setEditingSkill(null)

    setIsCreatingWorkRecord(false)
    setEditingWorkRecord(null)

    setCreatingProposal(null)
    setSelectedProposalHistory(null)
    setEditingProposalHistory(null)
  }

  const handleChangePage = (page: Page) => {
    setCurrentPage(page)
    resetPageState()
  }

  const handleLogin = (userId: number) => {
    login(userId)

    setCurrentPage('top')
    resetPageState()
  }

  const handleRegister = (user: User) => {
    register(user)

    setCurrentPage('top')
    resetPageState()
  }

  const handleLogout = () => {
    logout()

    setAuthMode('login')
    setCurrentPage('top')
    resetPageState()
  }

  const handleCreateProject = (project: Project) => {
    createProject(project)

    setIsCreatingProject(false)
    setSelectedProject(null)
    setEditingProject(null)
    setSelectedProjectId(null)
    setCurrentPage('projects')
  }

  const handleUpdateProject = (updatedProject: Project) => {
    updateProject(updatedProject)

    setSelectedProject(null)
    setEditingProject(null)
    setIsCreatingProject(false)
    setSelectedProjectId(null)
    setCurrentPage('projects')
  }

  const handleDeleteProject = (projectId: number) => {
    deleteProject(projectId)

    setSelectedProject(null)
    setEditingProject(null)
    setSelectedProjectId(null)
    setCurrentPage('projects')
  }

  const handleRestoreProject = (projectId: number) => {
    restoreProject(projectId)

    setCurrentPage('projects')
  }

  const handleCreateEngineer = (engineer: Engineer) => {
    createEngineer(engineer)

    setIsCreatingEngineer(false)
    setSelectedEngineer(null)
    setEditingEngineer(null)
    setCurrentPage('engineers')
  }

  const handleUpdateEngineer = (updatedEngineer: Engineer) => {
    updateEngineer(updatedEngineer)

    setIsCreatingEngineer(false)
    setSelectedEngineer(null)
    setEditingEngineer(null)
    setCurrentPage('engineers')
  }

  const handleDeleteEngineer = (engineerId: number) => {
    deleteEngineer(engineerId)

    setIsCreatingEngineer(false)
    setSelectedEngineer(null)
    setEditingEngineer(null)
    setCurrentPage('engineers')
  }

  const handleRestoreEngineer = (engineerId: number) => {
    restoreEngineer(engineerId)

    setCurrentPage('engineers')
  }

  const handleCreateSkill = (skill: Skill) => {
    createSkill(skill)

    setIsCreatingSkill(false)
    setEditingSkill(null)
    setCurrentPage('skills')
  }

  const handleUpdateSkill = (updatedSkill: Skill) => {
    updateSkill(updatedSkill)

    setIsCreatingSkill(false)
    setEditingSkill(null)
    setCurrentPage('skills')
  }

  const handleDeleteSkill = (skillId: number) => {
    deleteSkill(skillId)

    setIsCreatingSkill(false)
    setEditingSkill(null)
    setCurrentPage('skills')
  }

  const handleCreateWorkRecord = (workRecord: WorkRecord) => {
    createWorkRecord(workRecord)

    setIsCreatingWorkRecord(false)
    setEditingWorkRecord(null)
    setCurrentPage('workRecords')
  }

  const handleUpdateWorkRecord = (updatedWorkRecord: WorkRecord) => {
    updateWorkRecord(updatedWorkRecord)

    setIsCreatingWorkRecord(false)
    setEditingWorkRecord(null)
    setCurrentPage('workRecords')
  }

  const handleDeleteWorkRecord = (workRecordId: number) => {
    deleteWorkRecord(workRecordId)

    setIsCreatingWorkRecord(false)
    setEditingWorkRecord(null)
    setCurrentPage('workRecords')
  }

  const handleRestoreWorkRecord = (workRecordId: number) => {
    restoreWorkRecord(workRecordId)

    setCurrentPage('workRecords')
  }

  const syncStatusesByProposalHistory = (
    proposalHistory: ProposalHistory,
  ) => {
    const nextProjectStatus = getProjectStatusByProposalStatus(
      proposalHistory.status,
    )

    const nextEngineerStatus = getEngineerStatusByProposalStatus(
      proposalHistory.status,
    )

    setProjects((prev) =>
      prev.map((project) =>
        project.id === proposalHistory.projectId
          ? {
            ...project,
            status: nextProjectStatus,
          }
          : project,
      ),
    )

    setEngineers((prev) =>
      prev.map((engineer) =>
        engineer.id === proposalHistory.engineerId
          ? {
            ...engineer,
            status: nextEngineerStatus,
          }
          : engineer,
      ),
    )
  }

  const handleCreateProposalHistory = (proposalHistory: ProposalHistory) => {
    createProposalHistory(proposalHistory)

    syncStatusesByProposalHistory(proposalHistory)

    setCurrentPage('proposals')
    setIsCreatingProposalHistory(false)
    setSelectedProjectId(null)
    setCreatingProposal(null)
    setSelectedProposalHistory(null)
    setEditingProposalHistory(null)
  }

  const handleUpdateProposalHistory = (
    updatedProposalHistory: ProposalHistory,
  ) => {
    updateProposalHistory(updatedProposalHistory)

    syncStatusesByProposalHistory(updatedProposalHistory)

    setEditingProposalHistory(null)
    setSelectedProposalHistory(null)
    setCurrentPage('proposals')
  }

  const handleDeleteProposalHistory = (proposalHistoryId: number) => {
    deleteProposalHistory(proposalHistoryId)

    setSelectedProposalHistory(null)
    setEditingProposalHistory(null)
    setCurrentPage('proposals')
  }

  const handleRestoreProposalHistory = (proposalHistoryId: number) => {
    restoreProposalHistory(proposalHistoryId)

    setCurrentPage('proposals')
  }

  if (!currentUser) {
    if (authMode === 'register') {
      return (
        <RegisterPage
          users={users}
          onRegister={handleRegister}
          onBackToLogin={() => setAuthMode('login')}
        />
      )
    }

    return (
      <LoginPage
        users={users}
        onLogin={handleLogin}
        onOpenRegister={() => setAuthMode('register')}
      />
    )
  }

  return (
    <Layout
      currentUser={currentUser}
      currentPage={currentPage}
      onChangePage={handleChangePage}
      onLogout={handleLogout}
    >

      {currentPage === 'top' && (
        <DashboardPage
          currentUser={currentUser}
          projects={projects}
          engineers={engineers}
          proposalHistories={proposalHistories}
          workRecords={workRecords}
          onChangePage={handleChangePage}
        />
      )}

      {currentPage === 'projects' &&
        !isCreatingProject &&
        selectedProject === null &&
        editingProject === null &&
        selectedProjectId === null &&
        creatingProposal === null && (
          <ProjectListPage
            currentUser={currentUser}
            projects={projects}
            onOpenCreate={() => setIsCreatingProject(true)}
            onOpenDetail={(project) => setSelectedProject(project)}
            onOpenEdit={(project) => setEditingProject(project)}
            onOpenMatching={(projectId) => setSelectedProjectId(projectId)}
            onDelete={handleDeleteProject}
            onRestore={handleRestoreProject}
          />
        )}

      {currentPage === 'projects' && isCreatingProject && (
        <ProjectCreatePage
          currentUser={currentUser}
          skills={skills}
          onCreate={handleCreateProject}
          onCancel={() => setIsCreatingProject(false)}
        />
      )}

      {currentPage === 'projects' && selectedProject !== null && (
        <ProjectDetailPage
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
        />
      )}

      {currentPage === 'projects' && editingProject !== null && (
        <ProjectEditPage
          skills={skills}
          project={editingProject}
          onUpdate={handleUpdateProject}
          onCancel={() => setEditingProject(null)}
        />
      )}

      {currentPage === 'projects' &&
        !isCreatingProject &&
        selectedProject === null &&
        editingProject === null &&
        selectedProjectId !== null &&
        creatingProposal === null && (
          <ProjectMatchingPage
            currentUser={currentUser}
            projects={projects}
            engineers={engineers}
            projectId={selectedProjectId}
            onBack={() => setSelectedProjectId(null)}
            onCreateProposal={(projectId, engineerId) =>
              setCreatingProposal({ projectId, engineerId })
            }
          />
        )}

      {currentPage === 'projects' &&
        !isCreatingProject &&
        selectedProject === null &&
        editingProject === null &&
        selectedProjectId !== null &&
        creatingProposal !== null && (
          <ProposalHistoryCreatePage
            projects={projects}
            engineers={engineers}
            projectId={creatingProposal.projectId}
            engineerId={creatingProposal.engineerId}
            onBack={() => setCreatingProposal(null)}
            onCreate={handleCreateProposalHistory}
          />
        )}

      {currentPage === 'engineers' &&
        !isCreatingEngineer &&
        selectedEngineer === null &&
        editingEngineer === null && (
          <EngineerListPage
            currentUser={currentUser}
            engineers={engineers}
            onOpenCreate={() => setIsCreatingEngineer(true)}
            onOpenDetail={(engineer) => setSelectedEngineer(engineer)}
            onOpenEdit={(engineer) => setEditingEngineer(engineer)}
            onDelete={handleDeleteEngineer}
            onRestore={handleRestoreEngineer}
          />
        )}

      {currentPage === 'engineers' && isCreatingEngineer && (
        <EngineerCreatePage
          currentUser={currentUser}
          skills={skills}
          onCreate={handleCreateEngineer}
          onCancel={() => setIsCreatingEngineer(false)}
        />
      )}

      {currentPage === 'engineers' && selectedEngineer !== null && (
        <EngineerDetailPage
          engineer={selectedEngineer}
          onBack={() => setSelectedEngineer(null)}
        />
      )}

      {currentPage === 'engineers' && editingEngineer !== null && (
        <EngineerEditPage
          skills={skills}
          engineer={editingEngineer}
          onUpdate={handleUpdateEngineer}
          onCancel={() => setEditingEngineer(null)}
        />
      )}

      {currentPage === 'skills' && !isCreatingSkill && editingSkill === null && (
        <SkillListPage
          skills={skills}
          onOpenCreate={() => setIsCreatingSkill(true)}
          onOpenEdit={(skill) => setEditingSkill(skill)}
          onDelete={handleDeleteSkill}
        />
      )}

      {currentPage === 'skills' && isCreatingSkill && (
        <SkillCreatePage
          skills={skills}
          onCreate={handleCreateSkill}
          onCancel={() => setIsCreatingSkill(false)}
        />
      )}

      {currentPage === 'skills' && editingSkill !== null && (
        <SkillEditPage
          skill={editingSkill}
          skills={skills}
          onUpdate={handleUpdateSkill}
          onCancel={() => setEditingSkill(null)}
        />
      )}

      {currentPage === 'proposals' &&
        !isCreatingProposalHistory &&
        selectedProposalHistory === null &&
        editingProposalHistory === null && (
          <ProposalHistoryListPage
            currentUser={currentUser}
            proposalHistories={proposalHistories}
            projects={projects}
            engineers={engineers}
            onOpenCreate={() => setIsCreatingProposalHistory(true)}
            onShowDetail={(proposalHistory) =>
              setSelectedProposalHistory(proposalHistory)
            }
            onEdit={(proposalHistory) =>
              setEditingProposalHistory(proposalHistory)
            }
            onDelete={handleDeleteProposalHistory}
            onRestore={handleRestoreProposalHistory}
          />
        )}

      {currentPage === 'proposals' && isCreatingProposalHistory && (
        <ProposalHistoryManualCreatePage
          projects={projects}
          engineers={engineers}
          onCreate={handleCreateProposalHistory}
          onCancel={() => setIsCreatingProposalHistory(false)}
        />
      )}

      {currentPage === 'proposals' && selectedProposalHistory !== null && (
        <ProposalHistoryDetailPage
          proposalHistory={selectedProposalHistory}
          projects={projects}
          engineers={engineers}
          onBack={() => setSelectedProposalHistory(null)}
        />
      )}

      {currentPage === 'proposals' && editingProposalHistory !== null && (
        <ProposalHistoryEditPage
          proposalHistory={editingProposalHistory}
          projects={projects}
          engineers={engineers}
          onBack={() => setEditingProposalHistory(null)}
          onUpdate={handleUpdateProposalHistory}
        />
      )}

      {currentPage === 'workRecords' &&
        !isCreatingWorkRecord &&
        editingWorkRecord === null && (
          <WorkRecordListPage
            workRecords={workRecords}
            projects={projects}
            engineers={engineers}
            onOpenCreate={() => setIsCreatingWorkRecord(true)}
            onOpenEdit={(workRecord) => setEditingWorkRecord(workRecord)}
            onDelete={handleDeleteWorkRecord}
            onRestore={handleRestoreWorkRecord}
          />
        )}

      {currentPage === 'workRecords' && isCreatingWorkRecord && (
        <WorkRecordCreatePage
          projects={projects}
          engineers={engineers}
          onCreate={handleCreateWorkRecord}
          onCancel={() => setIsCreatingWorkRecord(false)}
        />
      )}

      {currentPage === 'workRecords' && editingWorkRecord !== null && (
        <WorkRecordEditPage
          projects={projects}
          engineers={engineers}
          workRecord={editingWorkRecord}
          onUpdate={handleUpdateWorkRecord}
          onCancel={() => setEditingWorkRecord(null)}
        />
      )}
    </Layout>
  )
}