import type { Unit } from "../utilityTypes/Unit.ts";
import { unit } from "../utilityTypes/Unit.ts";

import { assert, assertEquals } from "jsr:@std/assert";

Deno.test("Unit type", () => {
    Deno.test("can be returned by a function", () => {
        const f = (): Unit => unit();
        assert(f());
        assertEquals(f(), unit());
    });
    Deno.test("it equals a truthy expression", () => {
        assert(unit());
        assertEquals(1 == 1, unit());
    });
});
