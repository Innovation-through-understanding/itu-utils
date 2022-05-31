/**
 * this helper type will extract the type T from Array<T>
 */
export type Unpacked<T> = T extends (infer U)[] ? U : T;
