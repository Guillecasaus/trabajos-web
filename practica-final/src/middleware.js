import { NextResponse } from 'next/server';

export function middleware(request) {
  const jwt = request.cookies.get('jwt')?.value; // Obtener el token JWT de las cookies
  const protectedRoutes = ['/dashboard', '/Clientes', '/ajustes']; // Rutas protegidas
  const publicRoutes = ['/login', '/registro']; // Rutas públicas para usuarios no logueados

  const currentPath = request.nextUrl.pathname;

  // Redirigir a login si intenta acceder a una ruta protegida sin estar autenticado
  if (!jwt && protectedRoutes.some((route) => currentPath.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirigir a dashboard si está autenticado e intenta acceder a login o registro
  if (jwt && publicRoutes.some((route) => currentPath.startsWith(route))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Continuar con la solicitud para todas las demás rutas
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)', // Ignorar rutas API, estáticos y favicon
  ],
};
