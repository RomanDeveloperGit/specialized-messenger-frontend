import { isTextMessage } from '../../message-checker/is-text-message';
import { MESSAGE_PARSE_ERROR } from '../../message-parse-error';
import type { Preparer } from '../config.interface';

export const prepareTextMessage: Preparer = ({ message }) => {
  if (!isTextMessage(message)) return MESSAGE_PARSE_ERROR;

  return message.content.text;
};
