import type { Dto } from '@specialized-messenger/api/specs';

type SystemUserLeftMessage = Omit<Dto['Message'], 'content'> & {
  type: { name: 'SYSTEM_USER_LEAVED' };
  content: { userPublicId: string };
};

export const isSystemUserLeftMessage = (
  message: Omit<Dto['Message'], 'content'>,
): message is SystemUserLeftMessage => {
  return (
    message.type.name === 'SYSTEM_USER_LEAVED' &&
    'content' in message &&
    !!message.content &&
    typeof message.content === 'object' &&
    'userPublicId' in message.content
  );
};
