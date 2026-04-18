import { createRoute, type RouteInstance, type RouteParams } from 'atomic-router';

export interface Route<Params extends RouteParams = RouteParams> {
  route: RouteInstance<Params>;
  path: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const createConfiguredRoute = <Params extends RouteParams = {}>(
  path: string,
): Route<Params> => {
  return {
    route: createRoute<Params>(),
    path,
  };
};
