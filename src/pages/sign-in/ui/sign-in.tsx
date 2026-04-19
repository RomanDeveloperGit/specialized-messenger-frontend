import type { FC } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUnit } from 'effector-react';
import { IconMessage2 } from '@tabler/icons-react';

import {
  Button,
  Center,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from '@mantine/core';

import {
  signIn as _signIn,
  signInFx,
} from '@/entities/auth/model/sign-in/action';
import {
  type SignInSchema,
  signInSchema,
} from '@/entities/auth/model/sign-in/schema';

export const SignInPage: FC = () => {
  const [isPending, signIn] = useUnit([signInFx.pending, _signIn]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = handleSubmit((data) => {
    signIn(data);
  });

  return (
    <Center h="100vh" bg="dark.9" p={10}>
      <Paper w={360} p="xl" radius="lg">
        <Stack gap="lg">
          <Group justify="center" gap={12}>
            <ThemeIcon size={40} radius="md" color="green">
              <IconMessage2 size={22} />
            </ThemeIcon>
            <Text size="xl" fw={500}>
              Авторизация
            </Text>
          </Group>
          <form onSubmit={onSubmit}>
            <Stack gap="sm">
              <TextInput
                {...register('login')}
                label="Логин"
                placeholder="Введите логин"
                disabled={isPending}
                error={errors.login?.message}
              />
              <PasswordInput
                {...register('password')}
                label="Пароль"
                placeholder="Введите пароль"
                disabled={isPending}
                error={errors.password?.message}
              />
              <Button
                type="submit"
                fullWidth
                mt="xs"
                color="green"
                loading={isPending}
              >
                Войти
              </Button>
            </Stack>
          </form>
          <Divider />
          <Text size="xs" c="dimmed" ta="center" lh={1.6}>
            Нет доступа?{' '}
            <Text span c="gray.3" fw={500}>
              Обратитесь к администратору
            </Text>{' '}
            — вход возможен только по приглашению.
          </Text>
        </Stack>
      </Paper>
    </Center>
  );
};
