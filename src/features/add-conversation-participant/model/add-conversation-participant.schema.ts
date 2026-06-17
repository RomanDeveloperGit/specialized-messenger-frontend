import z from 'zod';

export const addConversationParticipantsSchema = z.object({
  selectedUserPublicIds: z.array(z.string()).min(1, 'Минимум 1 участник'),
});

export type AddConversationParticipantsSchema = z.infer<
  typeof addConversationParticipantsSchema
>;
