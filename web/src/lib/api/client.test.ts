import { ApiError, createApiClient } from './client';

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

describe('createApiClient', () => {
  it('joins the base address and the path without doubling slashes', async () => {
    const fetcher = vi.fn().mockResolvedValue(jsonResponse({ status: 'ok' }));
    const client = createApiClient({ baseUrl: 'http://api.test/v1/', fetcher });

    await client.get('/health');

    expect(fetcher).toHaveBeenCalledWith('http://api.test/v1/health', expect.any(Object));
  });

  it('sends a JSON body on post', async () => {
    const fetcher = vi.fn().mockResolvedValue(jsonResponse({ id: 1 }, 201));
    const client = createApiClient({ baseUrl: 'http://api.test', fetcher });

    await expect(client.post('/volunteers', { name: 'Ada' })).resolves.toEqual({ id: 1 });

    const [, init] = fetcher.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe('POST');
    expect(init.body).toBe('{"name":"Ada"}');
  });

  it('raises an ApiError carrying the field errors of a validation failure', async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue(
        jsonResponse({ message: 'Invalid', errors: { email: ['Required'] } }, 422),
      );
    const client = createApiClient({ baseUrl: 'http://api.test', fetcher });

    const failure = await client.post('/volunteers', {}).catch((error: unknown) => error);

    expect(failure).toBeInstanceOf(ApiError);
    expect((failure as ApiError).status).toBe(422);
    expect((failure as ApiError).fieldErrors).toEqual({ email: ['Required'] });
  });

  it('falls back on the status text when the error body is not JSON', async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue(new Response('boom', { status: 500, statusText: 'Server Error' }));
    const client = createApiClient({ baseUrl: 'http://api.test', fetcher });

    await expect(client.get('/x')).rejects.toMatchObject({ status: 500, message: 'Server Error' });
  });
});
