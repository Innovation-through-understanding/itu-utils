import { isEmpty, isNil, keys } from "rambda";
import { maybe, type Monad, nothing } from "@itu/tsmonads";

import { arrayToRecord, containsValue, recordToArray } from "../array.ts";

import { assert, assertEquals, assertFalse } from "jsr:@std/assert";

Deno.test("arrayToRecord", () => {
  Deno.test("turns an array of objects into an object of objects", () => {
    const atr = arrayToRecord([{ id: "a", name: "foo" }, {
      id: "b",
      name: "bar",
    }, { name: "noid" }], "id");
    assertEquals(keys(atr).length, 2);
    assertEquals(atr.a, { id: "a", name: "foo" });
    assertEquals(atr.b, { id: "b", name: "bar" });
  });
});

Deno.test("containsValue", () => {
  Deno.test("works on strings", () => {
    assert(containsValue("h"));
    assert(containsValue("foobar"));
    assertFalse(containsValue(""));
  });
  Deno.test("works on nil values", () => {
    assertFalse(containsValue(null));
    assertFalse(containsValue(undefined));
  });
  Deno.test("works on arrays", () => {
    assert(containsValue([1]));
    assertFalse(containsValue([]));
  });
  Deno.test("works on monads", () => {
    const m = nothing();
    console.error(isNil(m));
    console.error(isEmpty(m));
    assert(containsValue(maybe(1) as Monad<unknown, unknown>));
    assertFalse(containsValue(nothing() as Monad<unknown, unknown>));
  });
});

Deno.test("toArray", () => {
  Deno.test("will return an array of strings", () => {
    const obj = { 17: "World", 23: "!", 1: "Hello" };
    const arr = recordToArray(obj);
    assertEquals(arr.length, 3);
    assertEquals(arr.join(" "), "Hello World !");
  });
  Deno.test("will also work with other properties, but cannot sort them without problems", () => {
    const obj = { 1: "Hello", Mass: "Confusion", Chaos: "!", 17: "World" };
    const arr = recordToArray(obj);
    assertEquals(arr.length, 4);
    assertEquals(arr.join(" "), "Hello World Confusion !");
  });
  Deno.test("will return an empty array if the object in question has no properties", () => {
    const obj = {};
    const arr = recordToArray(obj);
    assertEquals(arr.length, 0);
  });
});
