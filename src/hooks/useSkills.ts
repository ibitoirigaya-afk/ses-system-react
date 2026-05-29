import { useEffect, useState } from 'react'
import type { Skill } from '../features/skills/skillTypes'
import { mockSkills } from '../data/mockSkills'
import { STORAGE_KEYS } from '../constants/storageKeys'
import { loadFromStorage, saveToStorage } from '../utils/storage'

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>(() =>
    loadFromStorage(STORAGE_KEYS.skills, mockSkills),
  )

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.skills, skills)
  }, [skills])

  const createSkill = (skill: Skill) => {
    setSkills((prev) => [skill, ...prev])
  }

  const updateSkill = (updatedSkill: Skill) => {
    setSkills((prev) =>
      prev.map((skill) => (skill.id === updatedSkill.id ? updatedSkill : skill)),
    )
  }

  const deleteSkill = (skillId: number) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== skillId))
  }

  return {
    skills,
    createSkill,
    updateSkill,
    deleteSkill,
  }
}