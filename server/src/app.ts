import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { logger } from "@tqman/nice-logger";
import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";

import { api } from "./api";

export const app = new Elysia()
	.onError(({ code, error }) => {
	console.log(code, error)
		return "I'm a teapot"
	})
	.use(cors())
	.use(swagger())
	.use(logger())
	.use(staticPlugin({ prefix: "/" }))
	.use(api);
