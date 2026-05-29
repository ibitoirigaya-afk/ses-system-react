import { useEffect, useState } from 'react'
import type { User } from '../features/auth/authTypes'
import { mockUsers } from '../data/mockUsers'
import { STORAGE_KEYS } from '../constants/storageKeys'
import {
  loadFromStorage,
  removeFromStorage,
  saveToStorage,
} from '../utils/storage'

export function useAuthUsers() {
  const [users, setUsers] = useState<User[]>(() =>
    loadFromStorage(STORAGE_KEYS.users, mockUsers),
  )

  const [currentUserId, setCurrentUserId] = useState<number | null>(() =>
    loadFromStorage(STORAGE_KEYS.currentUserId, null),
  )

  const currentUser =
    currentUserId === null
      ? undefined
      : users.find((user) => user.id === currentUserId)

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.users, users)
  }, [users])

  useEffect(() => {
    if (currentUserId === null) {
      removeFromStorage(STORAGE_KEYS.currentUserId)
      return
    }

    saveToStorage(STORAGE_KEYS.currentUserId, currentUserId)
  }, [currentUserId])

  const login = (userId: number) => {
    setCurrentUserId(userId)
  }

  const register = (user: User) => {
    setUsers((prev) => [user, ...prev])
    setCurrentUserId(user.id)
  }

  const logout = () => {
    setCurrentUserId(null)
  }

  return {
    users,
    currentUser,
    currentUserId,
    login,
    register,
    logout,
  }
}