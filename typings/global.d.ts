
/**
 * Typing workers - see discussion at https://github.com/developit/workerize-loader/issues/3
 * USAGE
 * import createFooWorker from "workerize-loader!./foo.worker";
 * import * as FooWorker from "./foo.worker";
 * const fooWorker = createFooWorker<typeof FooWorker>();
 */

declare module "workerize-loader!*" {
  type AnyFunction = (...args: any[]) => any;
  type Async<F extends AnyFunction> = (...args: Parameters<F>) => Promise<ReturnType<F>>;

  type Workerized<T> = Worker & { [K in keyof T]: T[K] extends AnyFunction ? Async<T[K]> : never };

  function createInstance<T>(): Workerized<T>;
  export = createInstance;
}


type ReactButtonProps = React.PropsWithoutRef<JSX.IntrinsicElements["button"]>
type ReactDivProps = React.PropsWithoutRef<JSX.IntrinsicElements["div"]>
