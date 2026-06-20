import { CONFIG } from './config.implementation';
import type { Preparer } from './config.interface';

export const prepareMessageForActiveConversation: Preparer = ({
  message,
  allParticipants,
}) => {
  return CONFIG[message.type.name]({
    message,
    allParticipants,
  });
};
