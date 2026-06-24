import { z } from 'zod';

export const signInSchema = z.object({
  login: z.string().min(6, { error: 'Логин должен быть не менее 6 символов' }),
  password: z
    .string()
    .min(6, { error: 'Пароль должен быть не менее 6 символов' }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
