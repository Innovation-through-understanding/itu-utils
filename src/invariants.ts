import type { Invariant, TestFunction } from "./utilityTypes/Invariants";

/**
 * Helper function to create invariant expressions from 
 * @param expression 
 * @param message 
 * @returns (value: T, name: string) => Invariant function
 */
export function invariantFactory<T>(expression: TestFunction<T>, message: string): Invariant<T> {
    return (value: T, name: string) => invariant(expression(value), name + " " + message);
}

/**
 * Invariant check
 * @param value value to check (invariant throws if this is falsy)
 * @param message Exception message to throw on error
 */
export function invariant<T>(value: T,message?: string): asserts value is NonNullable<T> {
    if (!value) {
        throw new Error(`Invariant violation: ${message ?? "Expression failed"}`);
    }
}

// Pre-defined invariants

/** Checks if a value is undefined */
export const notUndefined = invariantFactory(<T>(t: T) => t !== undefined, "is undefined");

/** Checks if a value is null */
export const notNull = invariantFactory(<T>(t: T) => t !== null, "is null");

/** Checks if a value is null or undefined */
export const notNil = <T>(value: T, name: string) => { notUndefined(value, name); notNull(value, name); };

/** Checks if a value is a string */
export const isString = invariantFactory(<T>(t : T) => typeof t === "string", "is not a string");

/** Checks if a value is a number */
export const isNumber = invariantFactory(<T>(t : T) => typeof t === "number", "is not a number");
