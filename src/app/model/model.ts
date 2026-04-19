import { createEvent, createStore } from 'effector';

export const $isAppVisible = createStore<boolean>(false);

export const showApp = createEvent();

$isAppVisible.on(showApp, () => true);
