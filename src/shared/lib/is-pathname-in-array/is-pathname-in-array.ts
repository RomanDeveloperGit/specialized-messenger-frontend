const normalize = (pathname: string) =>
  pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;

const pathToRegex = (path: string) => {
  const normalized = normalize(path);
  const pattern = normalized.replaceAll(/:[^/]+/g, '[^/]+');

  return new RegExp(`^${pattern}$`);
};

export const isPathnameInArray = (pathnames: string[], pathname: string) => {
  const normalizedPathname = normalize(pathname);

  return pathnames.some((p) => {
    const regex = pathToRegex(p);

    return regex.test(normalizedPathname);
  });
};
