import { Duration } from "luxon";
import { map } from "rambda";

export {};

/**
 * Asynchronosly map over an array
 * @param f mapping function returning a promise
 * @param arr array
 * @returns PromiseSettledResult array
 */
export const settleMap = <T, U>(
  f: (x: T) => Promise<U>,
  arr: Array<T>,
): Promise<PromiseSettledResult<U>[]> =>
  Promise.allSettled(map<T, Promise<U>>(f, arr));

/**
 * Wait for the given number of ms
 * @param milliseconds wait timespan
 * @returns a promise that waits
 */
export const wait = (milliseconds: number | Duration): Promise<void> => {
  const ms = milliseconds instanceof Duration
    ? milliseconds.as("milliseconds")
    : milliseconds;
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Perform a promise, but reject after a timeout occured
 * Can be used directly by Promise.global
 * @param promise
 * @param timeoutValue custom timeoutvalue (defaults to Promise.defaults.timeout)
 * @returns a promise
 */
export const timeout = <T>(
  promise: Promise<T>,
  timeoutValue: number | Duration = 5000,
): Promise<T> => {
  let timerHandle: number | undefined = undefined;
  const timeoutPromise = new Promise((_, reject) => {
    timerHandle = setTimeout(
      () => {
        reject(new Error(`Timeout after ${timeoutValue} ms`));
      },
      timeoutValue instanceof Duration ? timeoutValue.toMillis() : timeoutValue,
    );
  });
  return Promise.race([
    promise.then((result) => {
      timerHandle && clearTimeout(timerHandle);
      return result;
    }),
    timeoutPromise,
  ]) as Promise<T>;
};
