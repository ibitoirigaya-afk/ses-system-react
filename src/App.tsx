import { useEffect, useState } from 'react'
import type { User } from './features/auth/authTypes'
import type { ProposalHistory } from './features/proposals/proposalTypes'
import type { Project } from './features/projects/projectTypes'
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
import { mockUsers } from './data/mockUsers'
import { mockProjects } from './data/mockProjects'
import { mockEngineers } from './data/mockEngineers'
import { mockSkills } from './data/mockSkills'
import { mockProposalHistories } from './data/mockProposalHistories'
import { mockWorkRecords } from './data/mockWorkRecords'

import {
  loadFromStorage,
  removeFromStorage,
  saveToStorage,
} from './utils/storage'
import { STORAGE_KEYS } from './constants/storageKeys'
import {
  getEngineerStatusByProposalStatus,
  getProjectStatusByProposalStatus,
} from './utils/proposalStatusSync'

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

  const [users, setUsers] = useState<User[]>(() =>
    loadFromStorage(STORAGE_KEYS.users, mockUsers),
  )

  const [currentUserId, setCurrentUserId] = useState<number | null>(() =>
    loadFromStorage(STORAGE_KEYS.currentUserId, null),
  )

  const [currentPage, setCurrentPage] = useState<Page>(() =>
    loadFromStorage(STORAGE_KEYS.currentPage, 'top'),
  )

  const [projects, setProjects] = useState<Project[]>(() =>
    loadFromStorage(STORAGE_KEYS.projects, mockProjects),
  )

  const [isCreatingProject, setIsCreatingProject] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  )

  const [engineers, setEngineers] = useState<Engineer[]>(() =>
    loadFromStorage(STORAGE_KEYS.engineers, mockEngineers),
  )

  const [isCreatingEngineer, setIsCreatingEngineer] = useState(false)
  const [selectedEngineer, setSelectedEngineer] = useState<Engineer | null>(
    null,
  )
  const [editingEngineer, setEditingEngineer] = useState<Engineer | null>(null)

  const [skills, setSkills] = useState<Skill[]>(() =>
    loadFromStorage(STORAGE_KEYS.skills, mockSkills),
  )

  const [isCreatingSkill, setIsCreatingSkill] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)

  const [workRecords, setWorkRecords] = useState<WorkRecord[]>(() =>
    loadFromStorage(STORAGE_KEYS.workRecords, mockWorkRecords),
  )

  const [isCreatingWorkRecord, setIsCreatingWorkRecord] = useState(false)
  const [editingWorkRecord, setEditingWorkRecord] =
    useState<WorkRecord | null>(null)

  const [creatingProposal, setCreatingProposal] =
    useState<CreatingProposal | null>(null)

  const [proposalHistories, setProposalHistories] = useState<ProposalHistory[]>(
    () => loadFromStorage(STORAGE_KEYS.proposalHistories, mockProposalHistories),
  )

  const [selectedProposalHistory, setSelectedProposalHistory] =
    useState<ProposalHistory | null>(null)

  const [editingProposalHistory, setEditingProposalHistory] =
    useState<ProposalHistory | null>(null)

  const [isCreatingProposalHistory, setIsCreatingProposalHistory] =
    useState(false)

  const currentUser =
    currentUserId === null
      ? undefined
      : users.find((user) => user.id === currentUserId)

  useEffect(() => {
  saveToStorage(STORAGE_KEYS.users, users)
}, [users])

  useEffect(() => {
  saveToStorage('ses-current-page', currentPage)
}, [currentPage])

  useEffect(() => {
    if (currentUserId === null) {
      removeFromStorage('ses-current-user-id')
      return
    }

    saveToStorage(STORAGE_KEYS.currentUserId, currentUserId)
  }, [currentUserId])

  useEffect(() => {
  saveToStorage('ses-projects', projects)
}, [projects])

  useEffect(() => {
  saveToStorage('ses-engineers', engineers)
}, [engineers])

  useEffect(() => {
  saveToStorage('ses-skills', skills)
}, [skills])

  useEffect(() => {
  saveToStorage('ses-work-records', workRecords)
}, [workRecords])

  useEffect(() => {
  saveToStorage('ses-proposal-histories', proposalHistories)
}, [proposalHistories])

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
    setCurrentUserId(userId)
    setCurrentPage('top')
    resetPageState()
  }

  const handleRegister = (user: User) => {
    setUsers((prev) => [user, ...prev])
    setCurrentUserId(user.id)
    setCurrentPage('top')
    resetPageState()
  }

  const handleLogout = () => {
    setCurrentUserId(null)
    setAuthMode('login')
    setCurrentPage('top')
    resetPageState()
  }

  const handleCreateProject = (project: Project) => {
    setProjects((prev) => [project, ...prev])
    setIsCreatingProject(false)
    setSelectedProject(null)
    setEditingProject(null)
    setSelectedProjectId(null)
    setCurrentPage('projects')
  }

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === updatedProject.id ? updatedProject : project,
      ),
    )

    setSelectedProject(null)
    setEditingProject(null)
    setIsCreatingProject(false)
    setSelectedProjectId(null)
    setCurrentPage('projects')
  }

  const handleDeleteProject = (projectId: number) => {
  setProjects((prev) =>
    prev.map((project) =>
      project.id === projectId
        ? {
            ...project,
            deletedAt: new Date().toISOString(),
          }
        : project,
    ),
  )

  setSelectedProject(null)
  setEditingProject(null)
  setSelectedProjectId(null)
  setCurrentPage('projects')
}

const handleRestoreProject = (projectId: number) => {
  setProjects((prev) =>
    prev.map((project) =>
      project.id === projectId
        ? {
            ...project,
            deletedAt: null,
          }
        : project,
    ),
  )

  setCurrentPage('projects')
}

  const handleCreateEngineer = (engineer: Engineer) => {
    setEngineers((prev) => [engineer, ...prev])
    setIsCreatingEngineer(false)
    setSelectedEngineer(null)
    setEditingEngineer(null)
    setCurrentPage('engineers')
  }

  const handleUpdateEngineer = (updatedEngineer: Engineer) => {
    setEngineers((prev) =>
      prev.map((engineer) =>
        engineer.id === updatedEngineer.id ? updatedEngineer : engineer,
      ),
    )

    setIsCreatingEngineer(false)
    setSelectedEngineer(null)
    setEditingEngineer(null)
    setCurrentPage('engineers')
  }

  const handleDeleteEngineer = (engineerId: number) => {
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

  setIsCreatingEngineer(false)
  setSelectedEngineer(null)
  setEditingEngineer(null)
  setCurrentPage('engineers')
}

const handleRestoreEngineer = (engineerId: number) => {
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

  setCurrentPage('engineers')
}

  const handleCreateSkill = (skill: Skill) => {
    setSkills((prev) => [skill, ...prev])
    setIsCreatingSkill(false)
    setEditingSkill(null)
    setCurrentPage('skills')
  }

  const handleUpdateSkill = (updatedSkill: Skill) => {
    setSkills((prev) =>
      prev.map((skill) => (skill.id === updatedSkill.id ? updatedSkill : skill)),
    )

    setIsCreatingSkill(false)
    setEditingSkill(null)
    setCurrentPage('skills')
  }

  const handleDeleteSkill = (skillId: number) => {
  const usedByProject = projects.some((project) =>
    project.skills.some((skill) => skill.id === skillId),
  )

  const usedByEngineer = engineers.some((engineer) =>
    engineer.skills.some((skill) => skill.id === skillId),
  )

  if (usedByProject || usedByEngineer) {
    alert('このスキルは案件または要員で使用中のため削除できません。')
    return
  }

  setSkills((prev) => prev.filter((skill) => skill.id !== skillId))

  setIsCreatingSkill(false)
  setEditingSkill(null)
  setCurrentPage('skills')
}

  const handleCreateWorkRecord = (workRecord: WorkRecord) => {
    setWorkRecords((prev) => [workRecord, ...prev])
    setIsCreatingWorkRecord(false)
    setEditingWorkRecord(null)
    setCurrentPage('workRecords')
  }

  const handleUpdateWorkRecord = (updatedWorkRecord: WorkRecord) => {
    setWorkRecords((prev) =>
      prev.map((workRecord) =>
        workRecord.id === updatedWorkRecord.id
          ? updatedWorkRecord
          : workRecord,
      ),
    )

    setIsCreatingWorkRecord(false)
    setEditingWorkRecord(null)
    setCurrentPage('workRecords')
  }

  const handleDeleteWorkRecord = (workRecordId: number) => {
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

  setIsCreatingWorkRecord(false)
  setEditingWorkRecord(null)
  setCurrentPage('workRecords')
}

const handleRestoreWorkRecord = (workRecordId: number) => {
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
  setProposalHistories((prev) => [proposalHistory, ...prev])

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
  setProposalHistories((prev) =>
    prev.map((proposalHistory) =>
      proposalHistory.id === updatedProposalHistory.id
        ? updatedProposalHistory
        : proposalHistory,
    ),
  )

  syncStatusesByProposalHistory(updatedProposalHistory)

  setEditingProposalHistory(null)
  setSelectedProposalHistory(null)
  setCurrentPage('proposals')
}

  const handleDeleteProposalHistory = (proposalHistoryId: number) => {
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

  setSelectedProposalHistory(null)
  setEditingProposalHistory(null)
  setCurrentPage('proposals')
}

const handleRestoreProposalHistory = (proposalHistoryId: number) => {
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