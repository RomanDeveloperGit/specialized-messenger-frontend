import z from 'zod';

export const createGroupConversationSchema = z.object({
  groupName: z
    .string()
    .min(2, 'Минимум 2 символа')
    .max(64, 'Максимум 64 символа'),
  selectedUserPublicIds: z.array(z.string()).min(1, 'Минимум 1 участник'),
});

export type CreateGroupConversationSchema = z.infer<
  typeof createGroupConversationSchema
>;
