import type { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ReactPageWithSideEffects<Props = {}> = FC<Props> & {
  registerPageSideEffects: () => void;
};

export const isReactPageWithSideEffects = (
  page: FC,
): page is ReactPageWithSideEffects => 'registerPageSideEffects' in page;
