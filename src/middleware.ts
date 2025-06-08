import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { only } from 'node:test'
import { Role } from './constants/type'
import { decodeToken } from './lib/utils'

const privatePaths = ['/admin']
const isAdminPaths = ['/admin']
const unAuthPaths = ['/login']
 
export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname || "/"; 
  // const token = request.cookies.get('token')?.value
  const isAuth = Boolean(request.cookies.get('token')?.value)
  if(privatePaths.some(path => pathName.startsWith(path)) && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if(unAuthPaths.some(path => pathName.startsWith(path)) && isAuth) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  const decodedToken = decodeToken(request.cookies.get('token')?.value); 
  const role = decodedToken?.role || Role.admin;

  const isNotAdminPath = role !== Role.admin && isAdminPaths.some(path => pathName.startsWith(path))  
  if (isNotAdminPath) {
    return NextResponse.redirect(new URL('/', request.url))  
  }

  return NextResponse.next()
}
 
export const config = {
  matcher: ['/admin/:path*', '/login'],
}


