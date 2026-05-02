import { isTextMessage } from '../../message-checker/is-text-message';
import type { Preparer } from '../config.interface';

export const prepareTextMessage: Preparer = (message) => {
  if (!isTextMessage(message)) return '';

  return `${message.author.firstName}: ${message.content.text}`;
};
