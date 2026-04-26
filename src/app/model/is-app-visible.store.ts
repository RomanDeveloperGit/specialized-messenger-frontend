import { createEvent, createStore } from 'effector';

export const showApp = createEvent();
export const $isAppVisible = createStore<boolean>(false).on(
  showApp,
  () => true,
);
