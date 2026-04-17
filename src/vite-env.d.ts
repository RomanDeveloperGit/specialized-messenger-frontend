// Не забываем продублировать в src/app/env/schema.ts
declare interface ImportMetaEnv {
  NODE_ENV: 'development' | 'production';
  APP_PORT: string;
  APP_API_ORIGIN: string;
  APP_WS_ORIGIN: string;
}
