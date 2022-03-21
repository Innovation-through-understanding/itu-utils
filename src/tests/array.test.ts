import { keys } from "ramda";
import { maybe,nothing } from "tsmonads";

import { arrayToRecord, containsValue, recordToArray } from "../array";

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

describe("toArray", () => {
    it("will return an array of strings", () => {
        const obj = { 17: "World", 23: "!", 1: "Hello"};
        const arr = recordToArray(obj);
        expect(arr).toHaveLength(3);
        expect(arr.join(" ")).toEqual("Hello World !");
    });
    it("will also work with other properties, but cannot sort them without problems", () => {
        const obj = { 1: "Hello", "Mass": "Confusion", "Chaos": "!", 17: "World" };
        const arr = recordToArray(obj);
        expect(arr).toHaveLength(4);
        expect(arr.join(" ")).toEqual("Hello World Confusion !");
    });
    it("will return an empty array if the object in question has no properties", () => {
        const obj = {};
        const arr = recordToArray(obj);
        expect(arr).toHaveLength(0);
    });
});
