import { match } from "../utilityTypes/Match.ts";

import { assertEquals } from "jsr:@std/assert";
Deno.test("match", () => {
  Deno.test("should match numbers properly", () => {
    const numberMatcher = match<number, number | string>(
      [(m) => m > 11 && m < 20, (_) => "Between 12 and 19"],
      [(m) => m < 6, (_) => "Smaller than 6"],
      (m) => m == 10, // Will just return the value itself
      [(_) => true, (_) => "Fall through"],
    );

    assertEquals(numberMatcher(1), "Smaller than 6");
    assertEquals(numberMatcher(10), 10);
    assertEquals(numberMatcher(14), "Between 12 and 19");
    assertEquals(numberMatcher(10101010), "Fall through");
  });
  Deno.test("should match object types", () => {
    interface User {
      username: string;
      password: string;
      su: boolean;
      active: boolean;
    }

    interface UserInfo {
      username: string;
      state: "user" | "superuser" | "inactive";
    }

    const userMatcher = match<User, UserInfo>(
      [
        (u) => u.su && u.active,
        (u) => ({ username: u.username, state: "superuser" }),
      ],
      [
        (u) => !u.su && u.active,
        (u) => ({ username: u.username, state: "user" }),
      ],
      [(_) => true, (u) => ({ username: u.username, state: "inactive" })],
    );

    assertEquals(
      userMatcher({
        username: "tedlasso",
        password: "soccer",
        su: false,
        active: true,
      }).state,
      "user",
    );
    assertEquals(
      userMatcher({
        username: "ledtasso",
        password: "football",
        su: false,
        active: false,
      }).state,
      "inactive",
    );
    assertEquals(
      userMatcher({
        username: "nedflanders",
        password: "church",
        su: true,
        active: true,
      }).state,
      "superuser",
    );
  });
  Deno.test("should match union types", () => {
    type A = { type: "A"; cause: string };
    type B = { type: "B"; effect: string };
    type C = { type: "C"; correlation: string };
    type ABC = A | B | C;

    const isA = (a: ABC): a is A => a.type === "A";

    const typeMatcher = match(
      [isA, (a) => (a as A).cause], // isA cannot act as a typeguard here!
      [(b) => b.type === "B", (b) => (b as B).effect],
      [(c) => c.type === "C", (c) => (c as C).correlation],
    );

    assertEquals(typeMatcher({ type: "A", cause: "CAUSE" }), "CAUSE");
    assertEquals(typeMatcher({ type: "B", effect: "EFFECT" }), "EFFECT");
    assertEquals(
      typeMatcher({ type: "C", correlation: "CORRELATION" }),
      "CORRELATION",
    );
  });
});
