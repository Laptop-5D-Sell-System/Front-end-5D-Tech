import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/admin']
const unAuthPaths = ['/login']
 
export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname || "/"; 
  const isAuth = Boolean(request.cookies.get('token')?.value)
  if(privatePaths.some(path => pathName.startsWith(path)) && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if(unAuthPaths.some(path => pathName.startsWith(path)) && isAuth) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  console.log(isAuth)

  return NextResponse.next()
}
 
export const config = {
  matcher: ['/admin/:path*', '/login'],
}


