import { envSchema } from './schema';

// Запускается при подъеме dev-сервера / билде
export const validatePreBuildEnv = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  envSchema.parse(process.env);
};
