import { createClient } from "@supabase/supabase-js";

const configuredUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const configuredKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/** False when the CMS env vars are missing; pages then render their built-in fallback content. */
export const isSupabaseConfigured = Boolean(configuredUrl && configuredKey);

// createClient throws on an empty URL, so hand it a placeholder that is never actually requested.
const url = configuredUrl || "http://supabase.invalid";
const key = configuredKey || "not-configured";

const unavailable = () =>
  new Response(JSON.stringify({ message: "Content service unavailable" }), {
    status: 503,
    headers: { "Content-Type": "application/json" },
  });

const resilientFetch = Object.assign(
  async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    if (!isSupabaseConfigured) return unavailable();
    try {
      return await fetch(input, init);
    } catch {
      return unavailable();
    }
  },
  {
    preconnect: (...args: Parameters<typeof fetch.preconnect>) => {
      if (typeof fetch.preconnect === "function") fetch.preconnect(...args);
    },
  },
);

if (!isSupabaseConfigured && process.env.NODE_ENV !== "production") {
  console.warn("[supabase] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY are not set — CMS content falls back to built-in defaults.");
}

export const supabase = createClient(url, key, {
  global: { fetch: resilientFetch },
});
