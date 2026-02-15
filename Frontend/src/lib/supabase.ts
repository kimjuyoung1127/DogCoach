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
  const toUserResult = () => ({ data: { user: session?.user ?? null }, error: null });

  const auth = {
    async getUser() {
      return toUserResult();
    },
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
          is_anonymous: true,
          identities: [],
        },
      };
      notify("SIGNED_IN");
      return toSessionResult();
    },
    async signInWithOAuth(options: { provider?: string; options?: { redirectTo?: string } }) {
      const provider = options?.provider ?? "google";
      session = {
        access_token: "demo-oauth-token",
        user: {
          id: "demo-user",
          email: "demo@taillog.local",
          role: "USER",
          is_anonymous: false,
          identities: [{ provider }],
        },
      };
      notify("SIGNED_IN");

      const redirectTo = options?.options?.redirectTo;
      if (typeof window !== "undefined" && redirectTo) {
        window.location.href = redirectTo;
      }
      return { data: { session }, error: null };
    },
    async linkIdentity(credentials: { provider?: string; options?: { redirectTo?: string } }) {
      const provider = credentials?.provider ?? "google";
      if (!session) {
        // If there's no active session, just behave like a sign-in for demo.
        return await auth.signInWithOAuth({ provider, options: credentials?.options });
      }

      const user: any = session.user as any;
      const identities = Array.isArray(user.identities) ? user.identities : [];
      if (!identities.find((i: any) => i?.provider === provider)) {
        identities.push({ provider, identity_id: `${provider}-demo` });
      }
      user.identities = identities;
      session = { ...session, user };
      notify("SIGNED_IN");

      const redirectTo = credentials?.options?.redirectTo;
      if (typeof window !== "undefined" && redirectTo) {
        window.location.href = redirectTo;
      }
      return { data: { session }, error: null };
    },
    async unlinkIdentity(identity: { provider?: string; identity_id?: string }) {
      if (!session) return { data: null, error: null };
      const user: any = session.user as any;
      const identities = Array.isArray(user.identities) ? user.identities : [];
      user.identities = identities.filter((i: any) => i?.provider !== identity?.provider);
      session = { ...session, user };
      notify("SIGNED_IN");
      return { data: null, error: null };
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
