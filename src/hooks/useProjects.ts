import { useEffect, useState } from 'react'
import type { Project } from '../features/projects/projectTypes'
import { mockProjects } from '../data/mockProjects'
import { STORAGE_KEYS } from '../constants/storageKeys'
import { loadFromStorage, saveToStorage } from '../utils/storage'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(() =>
    loadFromStorage(STORAGE_KEYS.projects, mockProjects),
  )

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.projects, projects)
  }, [projects])

  const createProject = (project: Project) => {
    setProjects((prev) => [project, ...prev])
  }

  const updateProject = (updatedProject: Project) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === updatedProject.id ? updatedProject : project,
      ),
    )
  }

  const deleteProject = (projectId: number) => {
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
  }

  const restoreProject = (projectId: number) => {
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
  }

  return {
    projects,
    setProjects,
    createProject,
    updateProject,
    deleteProject,
    restoreProject,
  }
}