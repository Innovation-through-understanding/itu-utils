import type { Nominal } from "../utilityTypes/Nominal.ts";

import { assertEquals } from "jsr:@std/assert";
type NominalId = Nominal<string, "NominalId">;
type OtherId = Nominal<string, "OtherId">;

const createId = (s: string) => s as NominalId;
const createOtherId = (s: string) => s as OtherId;

interface Entity {
    id: NominalId;
    value?: string;
}

interface OtherEntity {
    id: OtherId;
    otherValue?: string;
}

Deno.test("Nominal", () => {
    Deno.test("it is only assignable using a constructor function or cast", () => {
        const e: Entity = {
            id: createId("123"),
            // id: "123" /* - This creates a compiler error */
        };
        assertEquals(e.id, "123"); // Can be compared to a string value
        const o: OtherEntity = {
            id: createOtherId("123"),
            otherValue: "abc",
            // id: "123" /* - This creates a compiler error */
        };

        assertEquals(typeof e, typeof o);

        // const e2: Entity = o; /* Assignement is not possible - type mismatch */
        assertEquals(o.id, "123"); // Can be compared to a string value
    });
});
