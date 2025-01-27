import { ifNotZero, ifZero, isNotNil, maybeIf } from "../functional.ts";

import { assert, assertEquals, assertFalse } from "jsr:@std/assert";

Deno.test("ifZero", () => {
  Deno.test("should return the expression if the value is zero", () => {
    assertEquals(ifZero(0, "test"), "test");
  });
  Deno.test("should return undefined if the value is not zero", () => {
    assertEquals(ifZero(1, "test"), undefined);
  });
  Deno.test("should return undefined if the value is not zero", () => {
    assertEquals(ifZero(-1, "test"), undefined);
  });
});

Deno.test("ifNotZero", () => {
  Deno.test("should return the expression if the value is not zero", () => {
    assertEquals(ifNotZero(1, "test"), "test");
  });
  Deno.test("should return the expression if the value is not zero", () => {
    assertEquals(ifNotZero(-1, "test"), "test");
  });
  Deno.test("should return undefined if the value is zero", () => {
    assertEquals(ifNotZero(0, "test"), undefined);
  });
});

Deno.test("isNotNil", () => {
  Deno.test("should return true if the function parameter is not null or undefined", () => {
    assert(isNotNil(true));
    assert(isNotNil(false));
    assert(isNotNil([]));
    assert(isNotNil(0));
    assert(isNotNil(""));
    assertFalse(isNotNil(undefined));
    assertFalse(isNotNil(null));
  });
});

Deno.test("maybeIf", () => {
  Deno.test("should return maybe for positive tests, nothing for negative ones", () => {
    const expired = maybeIf((s: { expire: number }) => s.expire > 10);
    assert(expired({ expire: 12 }).hasValue);
    assertFalse(expired({ expire: 0 }).hasValue);
  });
});
