import { isTextMessage } from '../../message-checker/is-text-message';
import type { Preparer } from '../config.interface';

export const prepareTextMessage: Preparer = ({ lastMessage }) => {
  if (!isTextMessage(lastMessage)) return '';

  return `${lastMessage.author.firstName}: ${lastMessage.content.text}`;
};
