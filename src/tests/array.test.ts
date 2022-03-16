import { keys } from "ramda";
import { maybe,nothing } from "tsmonads";

import { arrayToRecord, containsValue } from "../array";

describe("arrayToRecord", () => {
    it("turns an array of objects into an object of objects", () => {
        const atr = arrayToRecord([{id: "a", name: "foo"}, {id: "b", name: "bar"}, { name: "noid"}], "id");
        expect(keys(atr)).toHaveLength(2);
        expect(atr.a).toEqual({id: "a", name: "foo"});
        expect(atr.b).toEqual({id: "b", name: "bar"});
    });
});

describe("containsValue", () => {
    it("works on strings", () => {
        expect(containsValue("h")).toBeTruthy();
        expect(containsValue("foobar")).toBeTruthy();
        expect(containsValue("")).toBeFalsy();
    });
    it("works on nil values", () => {
        expect(containsValue(null)).toBeFalsy();
        expect(containsValue(undefined)).toBeFalsy();
    });
    it("works on arrays", () => {
        expect(containsValue([1])).toBeTruthy();
        expect(containsValue([])).toBeFalsy();
    });
    it("works on monads", () => {
        expect(containsValue(maybe(1))).toBeTruthy();
        expect(containsValue(nothing())).toBeFalsy();
    });
});
