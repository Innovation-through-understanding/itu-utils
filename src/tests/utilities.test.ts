import { ifNotZero, ifZero, isNotNil, maybeIf } from "../functional";

describe("ifZero", () => {
    it("should return the expression if the value is zero", () => {
        expect(ifZero(0, "test")).toBe("test");
    });
    it("should return undefined if the value is not zero", () => {
        expect(ifZero(1, "test")).toBeUndefined;
    });
    it("should return undefined if the value is not zero", () => {
        expect(ifZero(-1, "test")).toBeUndefined;
    });
});

describe("ifNotZero", () => {
    it("should return the expression if the value is not zero", () => {
        expect(ifNotZero(1, "test")).toBe("test");
    });
    it("should return the expression if the value is not zero", () => {
        expect(ifNotZero(-1, "test")).toBe("test");
    });
    it("should return undefined if the value is zero", () => {
        expect(ifNotZero(0, "test")).toBeUndefined;
    });
});

describe("isNotNil", () => {
    it("should return true if the function parameter is not null or undefined", () => {
        expect(isNotNil(true)).toBeTruthy();
        expect(isNotNil(false)).toBeTruthy();
        expect(isNotNil([])).toBeTruthy();
        expect(isNotNil(0)).toBeTruthy();
        expect(isNotNil("")).toBeTruthy();
        expect(isNotNil(undefined)).toBeFalsy();
        expect(isNotNil(null)).toBeFalsy();
    });
});

describe("maybeIf", () => {
    it("should return maybe for positive tests, nothing for negative ones", () => {
        const expired = maybeIf((s: {expire: number}) => s.expire > 10);
        expect(expired({expire: 12}).hasValue).toBeTruthy();
        expect(expired({expire: 0}).hasValue).toBeFalsy();
    });
});
