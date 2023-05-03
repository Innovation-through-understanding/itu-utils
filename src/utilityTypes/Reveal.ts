/**
 * Reveal all properties of a deeply-inherited type.
 * 
 * Use this for (static) debugging purposes. Avoid using it in production.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type Reveal<T> = { [K in keyof T]: T[K] } & {};
