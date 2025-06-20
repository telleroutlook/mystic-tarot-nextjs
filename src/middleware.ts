import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|zh|fr|hi|ar)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)', '/([\\w-]+)?/users/(.+)']
}; 