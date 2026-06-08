'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api-client'

type UserProfile = {
  userId: string
  displayName: string | null
  pictureUrl: string | null
  role: string
}

export function useUser() {
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    api
      .get<UserProfile>('/auth/me')
      .then((data) => setUser(data))
      .catch(() => {})
  }, [])

  return user
}
