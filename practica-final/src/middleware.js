import { NextResponse } from 'next/server';

export function middleware(request) {
  const jwt = request.cookies.get('jwt')?.value; 
  const protectedRoutes = ['/dashboard', '/clientes', '/ajustes', '/proyectos', 
  '/proyectos/lista-proyectos', '/clientes/lista-clientes', '/albaranes', '/albaranes/lista-albaranes']; 
  const publicRoutes = ['/login', '/registro']; 

  const currentPath = request.nextUrl.pathname;

  if (!jwt && protectedRoutes.some((route) => currentPath.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (jwt && publicRoutes.some((route) => currentPath.startsWith(route))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)', 
  ],
};
