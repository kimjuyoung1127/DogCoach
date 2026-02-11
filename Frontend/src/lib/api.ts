type RequestOptions = {
  token?: string;
  credentials?: RequestCredentials;
  headers?: Record<string, string>;
};

type DashboardResponse = {
  dog_profile: {
    id: string;
    name: string;
    breed: string | null;
    age_months: number | null;
    profile_image_url: string | null;
  };
  stats: {
    total_logs: number;
    current_streak: number;
    last_logged_at: string | null;
  };
  recent_logs: Array<{
    id: string;
    behavior: string;
    intensity: number;
    occurred_at: string;
    antecedent?: string;
    consequence?: string;
    duration?: number;
  }>;
  issues: string[];
  env_triggers: string[];
  env_consequences: string[];
};

type DemoStore = {
  dashboard: DashboardResponse;
  logs: Array<{
    id: string;
    dog_id: string;
    behavior: string;
    intensity: number;
    occurred_at: string;
    antecedent?: string;
    consequence?: string;
    duration?: number;
  }>;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";
const API_PREFIX = "/api/v1";
const DEMO_MODE = !API_BASE_URL || process.env.NEXT_PUBLIC_DEMO_MODE === "true";
const STORAGE_KEY = "taillog_demo_store_v1";

function createDefaultStore(): DemoStore {
  const dogId = "demo-dog-1";
  const now = new Date().toISOString();
  const logs = [
    {
      id: "log-demo-1",
      dog_id: dogId,
      behavior: "Barking",
      intensity: 4,
      occurred_at: now,
      antecedent: "초인종",
      consequence: "진정시킴",
      duration: 25,
    },
  ];
  return {
    dashboard: {
      dog_profile: {
        id: dogId,
        name: "머루",
        breed: "믹스",
        age_months: 30,
        profile_image_url: null,
      },
      stats: {
        total_logs: logs.length,
        current_streak: 2,
        last_logged_at: now,
      },
      recent_logs: logs,
      issues: ["separation"],
      env_triggers: ["초인종", "배달 소리", "낯선 방문자"],
      env_consequences: ["간식 보상", "무시", "자리 이동"],
    },
    logs,
  };
}

function getStore(): DemoStore {
  if (typeof window === "undefined") return createDefaultStore();
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const store = createDefaultStore();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    return store;
  }
  try {
    return JSON.parse(raw) as DemoStore;
  } catch {
    const store = createDefaultStore();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    return store;
  }
}

function saveStore(store: DemoStore) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function updateDashboardFromLogs(store: DemoStore) {
  store.dashboard.recent_logs = [...store.logs].sort((a, b) =>
    b.occurred_at.localeCompare(a.occurred_at)
  );
  store.dashboard.stats.total_logs = store.logs.length;
  store.dashboard.stats.last_logged_at =
    store.dashboard.recent_logs[0]?.occurred_at || null;
}

async function mockRequest<T>(
  method: "GET" | "POST" | "PATCH" | "DELETE",
  path: string,
  body?: unknown
): Promise<T> {
  const store = getStore();

  if (method === "GET" && path === "/dashboard/") {
    updateDashboardFromLogs(store);
    saveStore(store);
    return store.dashboard as T;
  }

  if (method === "GET" && path.startsWith("/logs/")) {
    const dogId = path.replace("/logs/", "");
    const logs = store.logs.filter((log) => log.dog_id === dogId);
    return logs as T;
  }

  if (method === "GET" && path === "/auth/me") {
    return {
      id: "demo-user",
      role: "USER",
      latest_dog_id: store.dashboard.dog_profile.id,
      email: "demo@taillog.local",
    } as T;
  }

  if (method === "POST" && path === "/logs") {
    const payload = (body || {}) as Record<string, unknown>;
    const newLog = {
      id: `log-${Date.now()}`,
      dog_id: (payload.dog_id as string) || store.dashboard.dog_profile.id,
      behavior: String(payload.behavior || "Barking"),
      intensity: Number(payload.intensity || 3),
      occurred_at: String(payload.occurred_at || new Date().toISOString()),
      antecedent: payload.antecedent ? String(payload.antecedent) : "",
      consequence: payload.consequence ? String(payload.consequence) : "",
      duration: payload.duration ? Number(payload.duration) : undefined,
    };
    store.logs.unshift(newLog);
    updateDashboardFromLogs(store);
    saveStore(store);
    return newLog as T;
  }

  if (method === "PATCH" && path.startsWith("/logs/")) {
    const logId = path.replace("/logs/", "");
    const payload = (body || {}) as Record<string, unknown>;
    store.logs = store.logs.map((log) =>
      log.id === logId ? { ...log, ...payload } : log
    );
    updateDashboardFromLogs(store);
    saveStore(store);
    const updated = store.logs.find((log) => log.id === logId);
    return (updated || null) as T;
  }

  if (method === "POST" && path === "/onboarding/survey") {
    return { ok: true } as T;
  }

  if (method === "POST" && path === "/coach/generate") {
    return {
      summary: "분석 결과, 분리불안 신호가 관찰됩니다.",
      action_items: [
        "외출 전 5분 안정 루틴 만들기",
        "짧은 분리 연습을 하루 3회 반복",
      ],
    } as T;
  }

  throw new Error(`[DEMO] 지원하지 않는 API 경로: ${method} ${path}`);
}

function buildUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const hasPrefix = normalizedPath.startsWith(API_PREFIX);
  const finalPath = hasPrefix ? normalizedPath : `${API_PREFIX}${normalizedPath}`;
  // Avoid double prefix when API_BASE_URL already includes /api/v1
  const base = API_BASE_URL.endsWith(API_PREFIX)
    ? API_BASE_URL.slice(0, -API_PREFIX.length)
    : API_BASE_URL;
  return `${base}${finalPath}`;
}

async function request<T>(
  method: "GET" | "POST" | "PATCH" | "DELETE",
  path: string,
  body?: unknown,
  options: RequestOptions = {}
): Promise<T> {
  if (DEMO_MODE) {
    return mockRequest<T>(method, path, body);
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
    credentials: options.credentials ?? "same-origin",
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
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
  patch<T>(path: string, body?: unknown, options?: RequestOptions) {
    return request<T>("PATCH", path, body, options);
  },
  delete<T>(path: string, options?: RequestOptions) {
    return request<T>("DELETE", path, undefined, options);
  },
};

