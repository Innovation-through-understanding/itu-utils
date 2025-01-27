/**
 * Testing function that check the given value and returns true if it is correct
 */
export type TestFunction<T> = (value: T) => boolean;

/**
 * Invariant definition, message will be added to the thrown exception
 */
export type Invariant<T> = (value: T, message: string) => void;
