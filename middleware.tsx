import { NextResponse, NextRequest } from 'next/server';
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (
    // eslint-disable-next-line operator-linebreak
    !session &&
    (req.nextUrl.pathname.startsWith('/form') || req.nextUrl.pathname.startsWith('/dashboard'))
  ) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/login';
    return NextResponse.redirect(redirectUrl);
  }

  await supabase.auth.getSession();
  return res;
}
