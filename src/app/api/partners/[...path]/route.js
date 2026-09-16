import { NextResponse } from 'next/server'

const BACKEND_API =
  process.env.DINEFLOW_BACKEND_API_URL &&
  !process.env.DINEFLOW_BACKEND_API_URL.includes('railway')
    ? process.env.DINEFLOW_BACKEND_API_URL
    : 'https://api.dineflow.et/api'

const cookieOptions = {
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7,
  path: '/',
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
}

async function getPath(params) {
  const resolvedParams = await params
  return (resolvedParams?.path || []).join('/')
}

async function readBackendResponse(response) {
  const text = await response.text()

  try {
    return text ? JSON.parse(text) : {}
  } catch {
    return { message: text }
  }
}

function jsonResponse(data, status) {
  return NextResponse.json(data, { status })
}

async function proxyPartnerRequest(request, context) {
  const path = await getPath(context.params)

  if (path === 'logout') {
    const response = jsonResponse({ ok: true }, 200)
    response.cookies.set('partner_token', '', { ...cookieOptions, maxAge: 0 })
    return response
  }

  const incomingUrl = new URL(request.url)
  const backendUrl = `${BACKEND_API}/partners/${path}${incomingUrl.search}`
  const headers = new Headers()
  const token = request.cookies.get('partner_token')?.value

  if (token) headers.set('Authorization', `Bearer ${token}`)

  const fetchOptions = {
    method: request.method,
    headers,
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const contentType = request.headers.get('content-type') || ''

    if (contentType.includes('multipart/form-data')) {
      fetchOptions.body = await request.formData()
    } else {
      const body = await request.text()
      if (body) fetchOptions.body = body
      if (contentType) headers.set('Content-Type', contentType)
    }
  }

  const backendResponse = await fetch(backendUrl, fetchOptions)
  const data = await readBackendResponse(backendResponse)

  if (path === 'login' && backendResponse.ok && data.token) {
    const safeData = { ...data }
    delete safeData.token
    const response = jsonResponse(safeData, backendResponse.status)
    response.cookies.set('partner_token', data.token, cookieOptions)
    return response
  }

  return jsonResponse(data, backendResponse.status)
}

export async function GET(request, context) {
  return proxyPartnerRequest(request, context)
}

export async function POST(request, context) {
  return proxyPartnerRequest(request, context)
}

export async function PUT(request, context) {
  return proxyPartnerRequest(request, context)
}

export async function PATCH(request, context) {
  return proxyPartnerRequest(request, context)
}

export async function DELETE(request, context) {
  return proxyPartnerRequest(request, context)
}
