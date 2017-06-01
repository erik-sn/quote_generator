/**
 * declaration file to appease compiler on modules that have 
 * no declarations on npm/@types. Possible to further extend
 * these as necessary.
 * 
 * Try to keep these in alphabetical order!
 */

declare module 'autoprefixer' {
  const _: any;
  export = _;
}

declare module 'axios' {
  const _: any;
  export = _;
}

declare module 'extract-text-webpack-plugin' {
  const _: any;
  export = _;
}

declare module 'js-cookie' {
  const _: any;
  export = _;
}

declare module 'moxios' {
  const _: any;
  export = _;
}


declare module 'react-router-redux' {
  export const ConnectedRouter: any;
  export const routerMiddleware: any;
  export const routerReducer: any;
}