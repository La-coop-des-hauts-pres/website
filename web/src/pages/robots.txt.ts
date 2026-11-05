import type { APIRoute } from 'astro';

import { robotsText } from '@/lib/seo';

export const GET: APIRoute = ({ site }) =>
  new Response(robotsText(site ?? new URL('http://localhost:4321'), []), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
