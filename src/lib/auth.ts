import { createAuthClient } from "@neondatabase/neon-js/auth";

const NEON_AUTH_URL =
  import.meta.env.VITE_NEON_AUTH_URL ||
  "https://ep-spring-cake-az0sitbd.neonauth.c-3.ap-southeast-1.aws.neon.tech/neondb/auth";

export const authClient = createAuthClient(NEON_AUTH_URL);
