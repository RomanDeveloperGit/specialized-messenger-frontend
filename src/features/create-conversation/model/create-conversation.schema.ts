import z from 'zod';

export const createConversationSchema = z.discriminatedUnion('isGroup', [
  z.object({
    isGroup: z.literal(false),
    selectedUserIds: z.array(z.string()).length(1),
    groupName: z.string().optional(),
  }),
  z.object({
    isGroup: z.literal(true),
    selectedUserIds: z.array(z.string()).min(2),
    groupName: z
      .string()
      .min(2, 'Минимум 2 символа')
      .max(64, 'Максимум 64 символа'),
  }),
]);
export type CreateConversationSchema = z.infer<typeof createConversationSchema>;
