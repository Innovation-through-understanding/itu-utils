import { always, complement, equals, ifElse, isNil, when } from "ramda";
import type { Maybe} from "tsmonads";
import { maybe, nothing } from "tsmonads";

/**
 * Performs expr if n is not zero
 * @param n 
 * @param expr 
 * @returns 
 */
export const ifNotZero = (n: number, expr: unknown): unknown =>
    when<number, void>(
        (x: number) => !equals(x, 0),
        () => expr
    )(n);

/**
* Performs expr if n is zero
* @param n 
* @param expr 
* @returns 
*/
export const ifZero = (n: number, expr: unknown): unknown =>
    when<number, void>(
        (x: number) => equals(x, 0),
        () => expr
    )(n);

/** 
* Returns if the given parameter is neither null nor undefined 
*/
export const isNotNil = complement(isNil);

/**
 * A function that does exactly nothing
 */
export const noop = always(undefined);

/**
 * Helper function to create a Maybe monad based on the result of a predicate
 * @param predicate will be called on the functions value T. If true, return Some<T>, otherwise, Nothing
 * @returns function with arity 1 that accepts a value to be wrapped in the Maybe
 * 
 * @example Typescript - If a session has expired, return nothing, otherwise return the session
 * const expired = maybeIf((s: Session) => s.expire < toTimestamp());
 */
export const maybeIf = <T>(predicate: (obj: T) => boolean): (obj: T) => Maybe<T> => ifElse(predicate, obj => maybe(obj), nothing);
