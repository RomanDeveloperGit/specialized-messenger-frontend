import type { FC } from 'react';

import { Alert } from 'antd';

export const Fallback: FC = () => {
  return (
    <Alert
      title="Что-то пошло не так"
      description={'Попробуйте перезагрузить страницу'}
      type="error"
      showIcon={true}
    />
  );
};
