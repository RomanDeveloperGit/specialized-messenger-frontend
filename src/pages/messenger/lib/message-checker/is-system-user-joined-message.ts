import type { Dto } from '@specialized-messenger/api/specs';

type SystemUserJoinedMessage = Omit<Dto['Message'], 'content'> & {
  type: { name: 'SYSTEM_USER_JOINED' };
  content: { userPublicId: string };
};

export const isSystemUserJoinedMessage = (
  message: Omit<Dto['Message'], 'content'>,
): message is SystemUserJoinedMessage => {
  return (
    message.type.name === 'SYSTEM_USER_JOINED' &&
    'content' in message &&
    !!message.content &&
    typeof message.content === 'object' &&
    'userPublicId' in message.content
  );
};
