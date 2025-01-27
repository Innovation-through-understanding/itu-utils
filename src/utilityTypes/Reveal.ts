/**
 * Reveal all properties of a deeply-inherited type.
 *
 * Use this for (static) debugging purposes. Avoid using it in production.
 */
// deno-lint-ignore ban-types
export type Reveal<T> = { [K in keyof T]: T[K] } & {};
