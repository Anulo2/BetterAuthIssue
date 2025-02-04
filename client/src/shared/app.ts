import { treaty } from "@elysiajs/eden";
import type { App } from "@better_auth_issue/server";

export const app = treaty<App>(window.location.origin, {});
