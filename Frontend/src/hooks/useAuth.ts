import { useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setUser(session.user);
                setToken(session.access_token);
                setLoading(false);
            } else {
                // 2. Auto-login Anonymously if no session
                signInAnonymously();
            }
        });

        // 3. Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setUser(session.user);
                setToken(session.access_token);
                setLoading(false);
            } else {
                // If signed out, maybe sign in anonymously again?
                // For now, let's just clear state
                setUser(null);
                setToken(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const signInAnonymously = async () => {
        try {
            const { data, error } = await supabase.auth.signInAnonymously();
            if (error) throw error;
            // State will be updated by onAuthStateChange
        } catch (error) {
            console.error("Anonymous login failed:", error);
            setLoading(false);
        }
    };

    return { user, token, loading };
}
