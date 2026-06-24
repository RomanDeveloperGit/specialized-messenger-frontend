import { useUnit } from 'effector-react';
import { IconLogout } from '@tabler/icons-react';

import { Tooltip, UnstyledButton } from '@mantine/core';

import { logOutFx } from '../model/log-out.effect';

export const LogOut = () => {
  const [logOut] = useUnit([logOutFx]);

  const handleClick = () => {
    logOut();
  };

  return (
    <Tooltip label="Выйти" position="bottom" withArrow>
      <UnstyledButton
        p={7}
        onClick={handleClick}
        aria-label="Выйти из приложения"
        style={(theme) => ({
          'borderRadius': theme.radius.md,
          'color': theme.colors.dark[2],
          'display': 'flex',
          'alignItems': 'center',
          'transition': 'background 0.15s, color 0.15s',
          '&:hover': {
            background: theme.colors.dark[6],
            color: theme.colors.red[5],
          },
        })}
      >
        <IconLogout size={16} stroke={1.7} />
      </UnstyledButton>
    </Tooltip>
  );
};
