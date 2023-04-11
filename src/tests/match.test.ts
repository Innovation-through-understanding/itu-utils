import { match } from "../utilityTypes/Match";

describe("match", () => {
    it("should match numbers properly", () => {
        const numberMatcher = match<number, number | string>(
            [m => m > 11 && m < 20, _ => "Between 12 and 19"], 
            [m => m < 6, _ => "Smaller than 6"], 
            m => m == 10, // Will just return the value itself
            [_ => true, _ => "Fall through"]);
		
        expect(numberMatcher(1)).toBe("Smaller than 6");
        expect(numberMatcher(10)).toBe(10);
        expect(numberMatcher(14)).toBe("Between 12 and 19");
        expect(numberMatcher(10101010)).toBe("Fall through");		
    });
    it("should match object types", () => {
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
		    [u => u.su && u.active, u => ({username: u.username, state: "superuser"})],
		    [u => !u.su && u.active, u => ({username: u.username, state: "user"})],
		    [_ => true, u => ({username: u.username, state: "inactive"})]
		);
		
		expect(userMatcher({username: "tedlasso", password: "soccer", su: false, active: true }).state).toBe("user");
		expect(userMatcher({username: "ledtasso", password: "football", su: false, active: false }).state).toBe("inactive");
		expect(userMatcher({username: "nedflanders", password: "church", su: true, active: true }).state).toBe("superuser");
    });
    it("should match union types", () => {
		type A = { type: "A", cause: string }
		type B = { type: "B", effect: string }
		type C = { type: "C", correlation: string }
		type ABC = A | B | C;

		const isA = (a: ABC): a is A => a.type === "A";

		const typeMatcher = match(
		    [isA, a => (a as A).cause], // isA cannot act as a typeguard here!
		    [b => b.type === "B", (b) => (b as B).effect],
		    [c => c.type === "C", (c) => (c as C).correlation],
		);

		expect(typeMatcher({ type: "A", cause: "CAUSE"})).toBe("CAUSE");
		expect(typeMatcher({ type: "B", effect: "EFFECT"})).toBe("EFFECT");
		expect(typeMatcher({ type: "C", correlation: "CORRELATION"})).toBe("CORRELATION");
    });
});
