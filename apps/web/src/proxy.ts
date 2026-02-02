import type { ProxyConfig, NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

import { isValidToken } from './utils/isValidToken'

const PUBLIC_ROUTES = ['/register', '/login', '/']
const REDIRECTABLE_ROUTES = ['/register', '/login']

const isPublicRoute = (path: string) => PUBLIC_ROUTES.includes(path)
const isRedirectableRoute = (path: string) => REDIRECTABLE_ROUTES.includes(path)

export const config: ProxyConfig = {
    matcher: [
        '/((?!api|_next/static|_next/image|logo.svg|logotipo.svg|favicon.ico|sitemap.xml|robots.txt|default-recipe-image.svg|$).*)'
    ]
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
    const path = request.nextUrl.pathname
    const accessToken = request.cookies.get('accessToken')?.value

    const isValidSession = accessToken && isValidToken(accessToken)

    if (!isPublicRoute(path) && !isValidSession) {
        const loginRoute = new URL('/login', request.url)

        const response = NextResponse.redirect(loginRoute)
        response.cookies.delete('accessToken')

        return response
    }

    if (isRedirectableRoute(path) && isValidSession) {
        const homeRoute = new URL('/', request.url)
        return NextResponse.redirect(homeRoute)
    }

    return NextResponse.next()
}
