import { type RouteParams } from 'atomic-router';

import type { RouteConfig } from './create-route-config';

export const getRouteByConfig = <T extends RouteParams>(
  config: RouteConfig<T>,
) => {
  return config.route;
};
