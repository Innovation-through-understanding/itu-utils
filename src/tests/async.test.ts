import { settleMap, wait } from "../async";

describe("settledMap", () => {
    it("will async map over array", async () => {
        const s = await settleMap(async a => Promise.resolve(a + 1), [2, 4, 6]);
        expect(s).toHaveLength(3);
        const t = s.map(s => (s as PromiseFulfilledResult<number>).value);
        expect(t).toEqual([3, 5, 7]);
    });
    it("will async map over array and reject correctly", async () => {
        const s = await settleMap(async () => Promise.reject("foo error"), [2, 4, 6]);
        expect(s).toHaveLength(3);
        const t = s.map(s => (s as PromiseRejectedResult).reason);
        expect(t).toEqual(["foo error", "foo error", "foo error"]);
    });
});

describe("wait", () => {
	it("will wait for an amount of time", async () => {
		const start = Date.now();
		await wait(300);
		const end = Date.now();
		expect(end-start).toBeGreaterThan(299);
		expect(end-start).toBeLessThan(310);
	})
})

describe("timeout", () => {
	it("will trigger when the timeout is reached", async () => {
		const tu = Promise.timeout(wait(1000), 500);
		expect(tu).rejects.toBeTruthy();
	})
	it("will not trigger when the timeout is not reached", async () => {
		const tu = Promise.timeout(Promise.resolve(true), 500);
		expect(tu).resolves.toBeTruthy();
	})
})
