import z from 'zod';

// Не забываем продублировать в vite-env.d.ts
export const envSchema = z.object({
  APP_PORT: z.string({}).min(2).max(5),
  APP_API_ORIGIN: z.url(),
  APP_WS_ORIGIN: z.url(),
});
