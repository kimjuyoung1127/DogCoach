type RequestOptions = {
  token?: string;
  credentials?: RequestCredentials;
  headers?: Record<string, string>;
};

function getApiBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "";

  const trimmed = raw.trim().replace(/\/+$/, "");

  // Prevent Mixed Content: if the page is HTTPS, force the API base URL to HTTPS too.
  if (typeof window !== "undefined" && window.location?.protocol === "https:") {
    if (trimmed.startsWith("http://")) {
      return `https://${trimmed.slice("http://".length)}`;
    }
  }

  return trimmed;
}

const API_PREFIX = "/api/v1";

function buildUrl(path: string): string {
  const apiBaseUrl = getApiBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const hasPrefix = normalizedPath.startsWith(API_PREFIX);
  const finalPath = hasPrefix ? normalizedPath : `${API_PREFIX}${normalizedPath}`;
  const base = apiBaseUrl.endsWith(API_PREFIX)
    ? apiBaseUrl.slice(0, -API_PREFIX.length)
    : apiBaseUrl;
  return `${base}${finalPath}`;
}

async function request<T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  path: string,
  body?: unknown,
  options: RequestOptions = {}
): Promise<T> {
  const apiBaseUrl = getApiBaseUrl();
  if (!apiBaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is required. Set your backend base URL (e.g. https://api.example.com)."
    );
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const res = await fetch(buildUrl(path), {
    method,
    headers,
    credentials: options.credentials ?? "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  // Handle 204 No Content (empty response from DELETE)
  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

export const apiClient = {
  get<T>(path: string, options?: RequestOptions) {
    return request<T>("GET", path, undefined, options);
  },
  post<T>(path: string, body?: unknown, options?: RequestOptions) {
    return request<T>("POST", path, body, options);
  },
  put<T>(path: string, body?: unknown, options?: RequestOptions) {
    return request<T>("PUT", path, body, options);
  },
  patch<T>(path: string, body?: unknown, options?: RequestOptions) {
    return request<T>("PATCH", path, body, options);
  },
  delete<T>(path: string, options?: RequestOptions) {
    return request<T>("DELETE", path, undefined, options);
  },
};

