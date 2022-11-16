import type { Nominal } from "./Nominal";

/** 
 * Unit type for functional programming. For simplicity and minimal space consumption, this maps to `true` 
 * @important Note that this is different to `void` which basically is undefined and therefor *falsy*
 */
export type Unit = Nominal<true, "unit">;

/** Create a value of type Unit */
export const unit = (): Unit => true as Unit;
