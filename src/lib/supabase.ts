import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const resilientFetch = Object.assign(
  async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    try {
      return await fetch(input, init);
    } catch {
      return new Response(JSON.stringify({ message: "Content service unavailable" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
  {
    preconnect: (...args: Parameters<typeof fetch.preconnect>) => {
      if (typeof fetch.preconnect === "function") fetch.preconnect(...args);
    },
  },
);

export const supabase = createClient(url, key, {
  global: { fetch: resilientFetch },
});
