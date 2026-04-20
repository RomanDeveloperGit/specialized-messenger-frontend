import { z } from 'zod';

export const signInSchema = z.object({
  login: z.string().min(3, { error: 'Логин должен быть не менее 3 символов' }),
  password: z
    .string()
    .min(3, { error: 'Пароль должен быть не менее 3 символов' }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
