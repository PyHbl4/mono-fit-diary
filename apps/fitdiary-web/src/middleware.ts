import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { BASE_API_URL } from '@/lib/config';
console.log('BASE_API_URL in middleware: ', BASE_API_URL);


const PUBLIC_FILE = /\.(.*)$/;
const AUTH_PAGES = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Разрешаем доступ к публичным страницам и файлам
  if (
    AUTH_PAGES.includes(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  } else {
    console.log('token: ', token);    
  }

  try {
    const apiUrl = `${BASE_API_URL}/users/me`;
    
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return NextResponse.next();
    } else {
      // Токен невалиден, редирект на /login
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  } catch (error) {
    // Ошибка запроса, редирект на /login
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
