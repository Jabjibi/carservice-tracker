import { NextResponse } from 'next/server'

export function GET() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.NEXT_PUBLIC_LINE_CLIENT_ID ?? '',
    redirect_uri: process.env.NEXT_PUBLIC_LINE_REDIRECT_URI ?? '',
    state: crypto.randomUUID(),
    scope: 'openid profile',
  })

  return NextResponse.redirect(`https://access.line.me/oauth2/v2.1/authorize?${params.toString()}`)
}
