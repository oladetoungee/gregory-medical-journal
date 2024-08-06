import * as React from 'react';

// named imports for React.lazy: https://github.com/facebook/react/issues/14603#issuecomment-726551598
export function lazyImport<
  T extends React.ComponentType<any>,
  I extends { [K2 in K]: T },
  K extends keyof I,
>(factory: () => Promise<I>, name: K): I {
  return Object.create({
    [name]: React.lazy(() => factory().then((module) => ({ default: module[name] }))),
  });
}

// lazyImport2 that works for multiple named exports
export function lazyImport2<
  T extends React.ComponentType<any>,
  I extends { [K2 in K]: T },
  K extends keyof I,
>(factory: () => Promise<I>, names: K[]): I {
  const obj = Object.create({});
  names.forEach((name) => {
    obj[name] = React.lazy(() => factory().then((module) => ({ default: module[name] })));
  });
  return obj;
}

// Usage
// const { Home } = lazyImport(() => import("./Home"), "Home");
