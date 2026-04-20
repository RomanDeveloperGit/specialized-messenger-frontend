import { createRouteConfig } from './create-route-config';

export const signInRouteConfig = createRouteConfig('/sign-in');
export const invitationRouteConfig = createRouteConfig<{ id: string }>(
  '/invitation/:id',
);
export const messengerRouteConfig = createRouteConfig('/messenger');

export const PUBLIC_ROUTE_CONFIGS = [signInRouteConfig, invitationRouteConfig];

export const PROTECTED_ROUTE_CONFIGS = [messengerRouteConfig];

export const ALL_ROUTE_CONFIGS = [
  ...PUBLIC_ROUTE_CONFIGS,
  ...PROTECTED_ROUTE_CONFIGS,
];

export const DEFAULT_PUBLIC_ROUTE_CONFIG = signInRouteConfig;
export const DEFAULT_PROTECTED_ROUTE_CONFIG = messengerRouteConfig;
