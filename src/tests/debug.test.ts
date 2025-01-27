import { assertEquals } from "jsr:@std/assert";
import { debug } from "../debug.ts";

Deno.test("Test that debug returns its incoming expression", () => {
  assertEquals(debug(2, "Foo"), 2);
});
