import { createEvent, createStore } from 'effector';

export const $isInitialVisitToPublicRoute = createStore<boolean | null>(null);
export const setIsInitialVisitToPublicRoute = createEvent<boolean>();

$isInitialVisitToPublicRoute.on(
  setIsInitialVisitToPublicRoute,
  (_, payload) => payload,
);
