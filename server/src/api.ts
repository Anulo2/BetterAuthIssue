import Elysia from "elysia";
import { todosRoutes } from "./routes/todos";
import { scuoleRoutes } from "./routes/scuole";
import betterAuthView from "./utils/auth/auth-view";
import { giocoRoutes } from "./routes/gioco";

export const api = new Elysia({
	prefix: "/api",
})
	.all("/auth/*", betterAuthView)
