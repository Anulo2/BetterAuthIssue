import { treaty } from "@elysiajs/eden";
import type { App } from "@better_auth_issue/server";

export const app = treaty<App>(
    import.meta.env.VITE_API_URL || "http://localhost:3000"
    , {});
