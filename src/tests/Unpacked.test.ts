import type { Unpacked } from "../utilityTypes/Unpacked";

describe("Unpacked", () => {
    it("will extract a simple array type", () => {
        const s: Unpacked<Array<string>> = "";
        expect(s).toBe("");
    });
    it("will extract a complex array type", () => {
        const complexArray = [{ type: "demo", value: "foobar"}];
        const s: Unpacked<typeof complexArray> = complexArray[0];
        expect(s.value).toBe("foobar");
    });
    it("will return the type for non-array types", () => {
        const s: Unpacked<string> = "";
        expect(s).toBe("");
    });
});
