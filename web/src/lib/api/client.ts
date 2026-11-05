export class ApiError extends Error {
  readonly status: number;
  readonly fieldErrors: Readonly<Record<string, readonly string[]>>;

  constructor(
    status: number,
    message: string,
    fieldErrors: Readonly<Record<string, readonly string[]>> = {},
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

type ErrorBody = {
  readonly message?: string;
  readonly errors?: Record<string, readonly string[]>;
};

export type ApiClientOptions = {
  readonly baseUrl: string;
  readonly fetcher?: typeof fetch;
};

export type ApiClient = {
  readonly get: <T>(path: string, signal?: AbortSignal) => Promise<T>;
  readonly post: <T>(path: string, body: unknown, signal?: AbortSignal) => Promise<T>;
};

const joinUrl = (baseUrl: string, path: string): string =>
  `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;

export const createApiClient = ({ baseUrl, fetcher = fetch }: ApiClientOptions): ApiClient => {
  const request = async <T>(path: string, init: RequestInit): Promise<T> => {
    const response = await fetcher(joinUrl(baseUrl, path), {
      ...init,
      headers: { Accept: 'application/json', ...init.headers },
    });
    if (!response.ok) {
      const body = (await response.json().catch(() => ({}))) as ErrorBody;
      throw new ApiError(response.status, body.message ?? response.statusText, body.errors);
    }
    return (await response.json()) as T;
  };

  return {
    get: (path, signal) => request(path, { method: 'GET', ...(signal && { signal }) }),
    post: (path, body, signal) =>
      request(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        ...(signal && { signal }),
      }),
  };
};

export const apiClient = createApiClient({
  baseUrl: import.meta.env.PUBLIC_API_URL ?? '/api/v1',
});
