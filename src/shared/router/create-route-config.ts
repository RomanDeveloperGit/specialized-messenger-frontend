import {
  createRoute,
  type RouteInstance,
  type RouteParams,
} from 'atomic-router';

export interface RouteConfig<Params extends RouteParams = RouteParams> {
  route: RouteInstance<Params>;
  path: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const createRouteConfig = <Params extends RouteParams = {}>(
  path: string,
): RouteConfig<Params> => {
  return {
    route: createRoute<Params>(),
    path,
  };
};
