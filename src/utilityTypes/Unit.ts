import * as z from "zod";

const unitBrand: z.ZodBranded<z.ZodLiteral<true>, "unit"> = z.literal(true)
    .brand("unit");

/**
 * Unit type for functional programming. For simplicity and minimal space consumption, this maps to `true`
 * @important Note that this is different to `void` which basically is undefined and therefor *falsy*
 */
export type Unit = z.infer<typeof unitBrand>;

/** Create a value of type Unit */
export const unit = (): Unit => true as Unit;
