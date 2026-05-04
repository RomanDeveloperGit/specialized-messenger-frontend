import { z } from 'zod';

import { signInSchema } from '@/entities/auth/model/sign-in.schema';

export const acceptInvitationSchema = signInSchema
  .extend({
    passwordConfirm: signInSchema.shape.password,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Пароли не совпадают',
    path: ['passwordConfirm'],
  });

export type AcceptInvitationSchema = z.infer<typeof acceptInvitationSchema>;
