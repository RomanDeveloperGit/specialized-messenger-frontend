import type { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ReactPageWithSideEffect<Props = {}> = FC<Props> & {
  registerPageSideEffect: () => void;
};

export const isReactPageWithSideEffect = (
  page: FC,
): page is ReactPageWithSideEffect => 'registerPageSideEffect' in page;
