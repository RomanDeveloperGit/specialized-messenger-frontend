import { z } from 'zod';

export const acceptInvitationSchema = z
  .object({
    login: z
      .string()
      .min(3, { error: 'Логин должен быть не менее 3 символов' }),
    password: z
      .string()
      .min(3, { error: 'Пароль должен быть не менее 3 символов' }),
    passwordConfirm: z
      .string()
      .min(3, { error: 'Пароль должен быть не менее 3 символов' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Пароли не совпадают',
    path: ['passwordConfirm'],
  });

export type AcceptInvitationSchema = z.infer<typeof acceptInvitationSchema>;
