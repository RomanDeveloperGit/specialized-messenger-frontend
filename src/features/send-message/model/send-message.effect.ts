import { createEffect, type EventPayload } from 'effector';

import { sendMessage } from '@/shared/api/socket';

// здесь  как бы фасадик над обычным вызовом ивента sendMessage. Например, преобразует данные в нужный вид перед отправкой, когда появятся кружки, имейджи, видео и тд
export const sendMessageFx = createEffect<
  EventPayload<typeof sendMessage>,
  void
>(async (data) => {
  sendMessage(data);
});
