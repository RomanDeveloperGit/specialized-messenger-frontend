import type { Dto } from '@specialized-messenger/api/specs';

type TextMessage = Omit<Dto['Message'], 'content' | 'author'> & {
  type: { name: 'TEXT' };
  author: NonNullable<Dto['Message']['author']>;
  content: { text: string };
};

export const isTextMessage = (
  message: Omit<Dto['Message'], 'content'>,
): message is TextMessage => {
  return (
    message.type.name === 'TEXT' &&
    !!message.author &&
    'content' in message &&
    !!message.content &&
    typeof message.content === 'object' &&
    'text' in message.content
  );
};
