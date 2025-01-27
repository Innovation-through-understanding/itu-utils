import type { Unpacked } from "../utilityTypes/Unpacked.ts";

import { assertEquals } from "jsr:@std/assert";
Deno.test("Unpacked", () => {
  Deno.test("will extract a simple array type", () => {
    const s: Unpacked<Array<string>> = "";
    assertEquals(s, "");
  });
  Deno.test("will extract a complex array type", () => {
    const complexArray = [{ type: "demo", value: "foobar" }];
    const s: Unpacked<typeof complexArray> = complexArray[0];
    assertEquals(s.value, "foobar");
  });
  Deno.test("will return the type for non-array types", () => {
    const s: Unpacked<string> = "";
    assertEquals(s, "");
  });
});
