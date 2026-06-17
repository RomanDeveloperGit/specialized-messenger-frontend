import type { FC } from 'react';

import { Text } from '@mantine/core';

export const ErrorText: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Text size="xs" c="red.8">
      {children}
    </Text>
  );
};
