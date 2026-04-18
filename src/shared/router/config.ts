import { createConfiguredRoute } from './create-configured-route';

export const signInRoute = createConfiguredRoute('/sign-in');
export const invitationRoute = createConfiguredRoute<{ id: string }>('/invitation/:id');
export const messengerRoute = createConfiguredRoute('/messenger');

export const ALL_ROUTES = [signInRoute, invitationRoute, messengerRoute];

export const PUBLIC_ROUTES = [signInRoute, invitationRoute];
export const PROTECTED_ROUTES = [messengerRoute];

export const DEFAULT_PUBLIC_ROUTE = signInRoute;
export const DEFAULT_PROTECTED_ROUTE = messengerRoute;
