import type { FC } from 'react';

import { Alert } from '@mantine/core';

export const Fallback: FC = () => {
  return (
    <Alert title="Что-то пошло не так" color="red">
      Попробуйте перезагрузить страницу
    </Alert>
  );
};
