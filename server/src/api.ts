import Elysia from "elysia";
import betterAuthView from "./utils/auth/auth-view";

export const api = new Elysia({
	 prefix: "/api",
})
	.all("/auth/*", betterAuthView)
