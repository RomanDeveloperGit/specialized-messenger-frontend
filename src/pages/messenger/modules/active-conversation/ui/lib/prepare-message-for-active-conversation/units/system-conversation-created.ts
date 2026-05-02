import { isSystemConversationCreatedMessage } from '../../../../../../../../modules/conversation/lib/message-checker/is-system-conversation-created-message';
import type { Preparer } from '../config.interface';

export const prepareSystemConversationCreatedMessage: Preparer = (message) => {
  if (!isSystemConversationCreatedMessage(message)) return '';

  return 'Чат создан';
};
