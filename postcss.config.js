import autoprefixer from 'autoprefixer';

import sortMediaQueries from 'postcss-sort-media-queries';

/** @type {import('postcss-load-config').ConfigFn} */
const config = (ctx) => {
  if (ctx.env === 'development') {
    return {
      map: true,
    };
  }

  return {
    plugins: [
      autoprefixer({
        grid: true,
      }),
      sortMediaQueries({
        sort: 'mobile-first',
      }),
    ],
    map: true,
  };
};

export default config;
