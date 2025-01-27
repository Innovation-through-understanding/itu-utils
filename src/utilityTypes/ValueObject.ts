/**
 * A value object is an immutable, strict domain type
 * __Note__ that value objects can be JSON-stringified,
 * but loose their type safety in the process unless
 * you validate the parsed JSON back, e.g. with a library
 * like `zod`
 */
export type ValueObject<T> = Readonly<{
    type: string;
    value: T;
}>;
