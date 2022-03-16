import { always, complement, equals, isNil, when } from "ramda";

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

/**tintim
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
