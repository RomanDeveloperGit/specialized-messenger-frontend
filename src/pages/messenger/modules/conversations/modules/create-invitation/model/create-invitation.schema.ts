import { z } from 'zod';

export const createInvitationSchema = z.object({
  firstName: z
    .string()
    .min(3, { error: 'Имя должно быть не менее 3 символов' }),
  lastName: z
    .string()
    .min(3, { error: 'Фамилия должна быть не менее 3 символов' }),
});

export type CreateInvitationSchema = z.infer<typeof createInvitationSchema>;
