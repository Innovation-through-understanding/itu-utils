import { isEmpty,isNil } from "ramda";
import type { Monad } from "tsmonads";

type SubType<Base, Condition> = Pick<
    Base,
    {
        [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
    }[keyof Base]
>;

/**
 *
 * to convert an array of objects to object of nested-objects
 * where the key of the new object is selected from the keys of the nested-object
 * and the value is the nested-object it self
 * @param arr array of objects
 * @param keyName string: a key that belongs to the nested-object
 * @returns
 */
export const arrayToRecord = <T, K extends keyof SubType<T, string>>(arr: T[], keyName: K): Record<string, T> =>
    arr?.reduce((prev: Record<string, never> | Record<string, T>, current: T) => {
        const key = current[keyName];

        const accumulator = { ...prev };

        if (typeof key === "string") {
            accumulator[key] = current;
        }
        return accumulator;
    }, {}) ?? {};

/** Returns whether a list or monad exists and has at least one element */
export const containsValue = (list: undefined | null | string | Array<unknown> | Monad<unknown>): boolean =>
    !isNil(list) && !isEmpty(list);
