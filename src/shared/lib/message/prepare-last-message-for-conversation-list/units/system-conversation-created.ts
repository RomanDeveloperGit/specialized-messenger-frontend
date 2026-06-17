import { isSystemConversationCreatedMessage } from '../../message-checker/is-system-conversation-created-message';
import { MESSAGE_PARSE_ERROR } from '../../message-parse-error';
import type { Preparer } from '../config.interface';

export const prepareSystemConversationCreatedMessage: Preparer = (message) => {
  if (!isSystemConversationCreatedMessage(message)) return MESSAGE_PARSE_ERROR;

  return 'Чат создан';
};
