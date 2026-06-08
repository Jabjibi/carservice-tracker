'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
  const cookieStore = await cookies()
  const token = cookieStore.get('car_service_token')?.value

  if (token) {
    const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:5197'
    await fetch(`${backendUrl}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).catch(() => {})
  }

  cookieStore.delete('car_service_token')
  redirect('/login')
}
