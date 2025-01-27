import { isEmpty, isNil, keys } from "rambda";
import type { Monad } from "tsmonads";

type SubType<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
  }[keyof Base]
>;

/**
 * to convert an array of objects to object of nested-objects
 * where the key of the new object is selected from the keys of the nested-object
 * and the value is the nested-object it self
 * @param arr array of objects
 * @param keyName string: a key that belongs to the nested-object
 * @returns
 */
export const arrayToRecord = <T, K extends keyof SubType<T, string>>(
  arr: T[],
  keyName: K,
): Record<string, T> =>
  arr?.reduce((prev: Record<string, never> | Record<string, T>, current: T) => {
    const key = current[keyName];

    const accumulator = { ...prev };

    if (typeof key === "string") {
      accumulator[key] = current;
    }
    return accumulator;
  }, {}) ?? {};

/**
 * Turns an record with numerical-valued property names into an array. Array elements will be sorted
 * according to the numerical value of the record's property.
 *
 * If the object in question also contains non-numerical properties, the values will be appended to the
 * sorted array of numerical properties in order of their appearance.
 *
 * @param obj a record of the form { "1": ..., "2": ..., "4010": ...}
 * @returns array of property values
 */
export const recordToArray = <T>(obj: Record<string, T>): Array<T> => {
  const sortedKeys = keys(obj).sort((a, b) => parseInt(a) - parseInt(b));
  return sortedKeys.reduce<T[]>((arr, key) => [...arr, obj[key]], []);
};

/** Returns whether a list or monad exists and has at least one element */
export const containsValue = (
  list: undefined | null | string | Array<unknown> | Monad<unknown, unknown>,
): boolean => !isNil(list) && !isEmpty(list);
