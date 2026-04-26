export const convertArrayToDictionary = <
  T extends Record<string, unknown>,
  K extends {
    [P in keyof T]: T[P] extends string | number | symbol ? P : never;
  }[keyof T],
>(
  array: T[],
  key: K,
) => {
  return array.reduce((acc, item) => {
    const id = item[key] as string;

    return {
      ...acc,
      [id]: item,
    };
  }, {});
};
