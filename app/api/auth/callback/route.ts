import { NextResponse, type NextRequest } from 'next/server'

type TokenResponseDto = {
  accessToken: string
  expiresIn: number
}

type ApiResponse<T> = {
  success: boolean
  message: string
  data: T
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', request.url))
  }

  const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:5197'

  let tokenData: TokenResponseDto
  try {
    const res = await fetch(`${backendUrl}/api/auth/line/callback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, state }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('[callback] backend error', res.status, errText)
      return NextResponse.redirect(new URL('/login?error=auth_failed', request.url))
    }

    const body: ApiResponse<TokenResponseDto> = await res.json()
    tokenData = body.data
  } catch {
    return NextResponse.redirect(new URL('/login?error=network', request.url))
  }

  const response = NextResponse.redirect(new URL('/dashboard', request.url))
  response.cookies.set('car_service_token', tokenData.accessToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: tokenData.expiresIn,
    path: '/',
  })

  return response
}
