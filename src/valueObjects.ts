import R from "rambda";

import type { ValueObject } from "./utilityTypes/index.ts";

/**
 * Returns the value of a value object
 * @param vo value object
 * @returns enclosed type
 */
export const valueOf = <T, U extends ValueObject<T>>(vo: U): T => {
    return vo.value;
};

/**
 * Returns whether two value objects are equal
 * @param a a value object
 * @param b another value object
 * @returns true if a and b are equal
 */
export const equals = <T, U extends ValueObject<T>>(a: U, b: U) => {
    return R.equals(a.value, b.value);
};
