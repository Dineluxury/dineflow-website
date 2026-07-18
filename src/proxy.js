import { NextResponse } from 'next/server'

export function middleware(request) {
  // Protect all dashboard routes
  if (request.nextUrl.pathname.startsWith('/partners/dashboard')) {
    // Check if the secure partner_token cookie exists
    const token = request.cookies.get('partner_token')
    
    // If no token is found, intercept the request and redirect to login
    if (!token) {
      const loginUrl = new URL('/partners/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  // If token exists or it's not a protected route, continue normally
  return NextResponse.next()
}

// Optimize middleware by restricting it to specific paths
export const config = {
  matcher: '/partners/dashboard/:path*',
}
