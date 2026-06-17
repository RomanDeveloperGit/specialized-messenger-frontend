import { getLocalTime } from '../date/get-local-time';
import { isEqualDate } from '../date/is-equal-date';

const PREFIX = 'был(а) в сети';

export const getPreparedUserLastSeenDateText = (
  lastSeenDate?: string,
): string => {
  if (!lastSeenDate) {
    return 'не заходил(а) в сеть';
  }

  const date = new Date(lastSeenDate);
  const now = new Date();

  const isSameDay = isEqualDate(now, date);

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const isYesterday = isEqualDate(yesterday, date);

  const time = getLocalTime(date);

  if (isSameDay) {
    return `${PREFIX} в ${time}`;
  }

  if (isYesterday) {
    return `${PREFIX} вчера в ${time}`;
  }

  if (date.getFullYear() === now.getFullYear()) {
    const dayMonth = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
    }).format(date);

    return `${PREFIX} ${dayMonth} в ${time}`;
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${PREFIX} ${day}.${month}.${year} в ${time}`;
};
