import { isNumber, isString, notNil, notNull, notUndefined } from "../invariants";

describe("invariants", () => {
    it("isNumber should properly test for errors", () => {
        expect(() => isNumber("a", "x")).toThrowError("Invariant violation: x is not a number");
        expect(() => isNumber(1, "y")).not.toThrowError();
    });
    it("isString should properly test for errors", () => {
        expect(() => isString([1,2], "s")).toThrowError("Invariant violation: s is not a string");
        expect(() => isString("abc", "t")).not.toThrowError();
    });
    it("notUndefined should properly test for errors", () => {
        expect(() => notUndefined(undefined, "s")).toThrowError("Invariant violation: s is undefined");
        expect(() => notUndefined("abc", "t")).not.toThrowError();
        expect(() => notUndefined(null, "t")).not.toThrowError();
    });
    it("notNull should properly test for errors", () => {
        expect(() => notNull(null, "s")).toThrowError("Invariant violation: s is null");
        expect(() => notNull("abc", "t")).not.toThrowError();
        expect(() => notNull(undefined, "t")).not.toThrowError();
    });
    it("notNil should properly test for errors", () => {
        expect(() => notNil(undefined, "s")).toThrowError("Invariant violation: s is undefined");
        expect(() => notNil(null, "u")).toThrowError("Invariant violation: u is null");
        expect(() => notNil("abc", "t")).not.toThrowError();
    });
});
