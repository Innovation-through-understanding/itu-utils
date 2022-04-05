import type { Unit} from "../utilityTypes/Unit";
import { unit } from "../utilityTypes/Unit";

describe("Unit type", () => {
    it("can be returned by a function", () => {
        const f = (): Unit => unit();
        expect(f()).toBeTruthy();
        expect(f()).toBe(unit());
    });
    it("it equals a truthy expression", () => {
        expect(unit()).toBeTruthy();
        expect(1 == 1).toEqual(unit());
    });
});
