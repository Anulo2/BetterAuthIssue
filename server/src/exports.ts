import type { app } from "./app";
import { auth } from "./utils/auth/auth";

export type App = typeof app;
export { auth };
