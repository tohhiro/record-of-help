import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from './app/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);

  await supabase.auth.getSession();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session && !request.url.includes('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (session && request.url.includes('/login')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
