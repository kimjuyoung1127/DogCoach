import { createClient } from "@supabase/supabase-js";

type AuthListener = (
  event: "SIGNED_IN" | "SIGNED_OUT",
  session: { access_token: string; user: Record<string, unknown> } | null
) => void;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

function createMockSupabase() {
  let session: { access_token: string; user: Record<string, unknown> } | null = null;
  const listeners: AuthListener[] = [];

  const notify = (event: "SIGNED_IN" | "SIGNED_OUT") => {
    listeners.forEach((listener) => listener(event, session));
  };

  const toSessionResult = () => ({ data: { session }, error: null });

  const auth = {
    async getSession() {
      return toSessionResult();
    },
    async signInAnonymously() {
      session = {
        access_token: "demo-anon-token",
        user: {
          id: "demo-user",
          email: "demo@taillog.local",
          role: "GUEST",
        },
      };
      notify("SIGNED_IN");
      return toSessionResult();
    },
    async signInWithOAuth(options: { options?: { redirectTo?: string } }) {
      session = {
        access_token: "demo-oauth-token",
        user: {
          id: "demo-user",
          email: "demo@taillog.local",
          role: "USER",
        },
      };
      notify("SIGNED_IN");

      const redirectTo = options?.options?.redirectTo;
      if (typeof window !== "undefined" && redirectTo) {
        window.location.href = redirectTo;
      }
      return { data: { session }, error: null };
    },
    async signOut() {
      session = null;
      notify("SIGNED_OUT");
      return { error: null };
    },
    onAuthStateChange(callback: AuthListener) {
      listeners.push(callback);
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              const idx = listeners.indexOf(callback);
              if (idx >= 0) listeners.splice(idx, 1);
            },
          },
        },
      };
    },
  };

  return { auth };
}

export const supabase: any = isConfigured
  ? createClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string)
  : createMockSupabase();

