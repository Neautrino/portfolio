interface Env {
  ASSETS: Fetcher;
  VISITOR_KV: KVNamespace;
}

const VISIT_COOKIE = 'neautrino_visited';
const KV_KEY = 'unique_visitor_count';

/**
 * Real, shared unique-visitor counter backed by Cloudflare KV.
 *
 * - GET /api/visitors reads the current count. If the request has no
 *   `neautrino_visited` cookie, it's treated as a new unique visitor:
 *   the count is incremented in KV and the cookie is set for 24h, so
 *   repeat visits within that window don't inflate the count.
 * - Every other path falls through to the static assets binding
 *   (this Worker only intercepts /api/* per wrangler.toml's
 *   run_worker_first pattern).
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/visitors' && request.method === 'GET') {
      return handleVisitors(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleVisitors(request: Request, env: Env): Promise<Response> {
  const cookieHeader = request.headers.get('Cookie') ?? '';
  const alreadyVisited = cookieHeader
    .split(';')
    .some((c) => c.trim().startsWith(`${VISIT_COOKIE}=`));

  let count = parseInt((await env.VISITOR_KV.get(KV_KEY)) ?? '0', 10);
  if (Number.isNaN(count)) count = 0;

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  });

  if (!alreadyVisited) {
    count += 1;
    await env.VISITOR_KV.put(KV_KEY, String(count));
    headers.append(
      'Set-Cookie',
      `${VISIT_COOKIE}=1; Max-Age=86400; Path=/; SameSite=Lax; Secure; HttpOnly`,
    );
  }

  return new Response(JSON.stringify({ count }), { headers });
}
