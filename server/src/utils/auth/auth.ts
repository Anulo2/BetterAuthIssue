import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../../db";
import { account, session, user, verification } from "../../db/auth-schema";
import { env } from "../../env";

const trustedOrigins = [
  "http://127.0.0.1:5173",
  `https://${env.HOSTNAME}`,
  ...env.TRUSTED_ORIGINS.split(",").map((origin) => `https://${origin}`),
];

export const auth = betterAuth({
  trustedOrigins,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user,
      session,
      verification,
      account,
    },
  }),
  user: {
    additionalFields: {},
  },
  emailAndPassword: {
    enabled: true,
  },
});
