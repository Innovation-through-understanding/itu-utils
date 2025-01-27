import { Duration } from "luxon";

import { settleMap, timeout, wait } from "../async.ts";
import { seconds } from "../time.ts";

import { assert, assertEquals, assertRejects } from "jsr:@std/assert";

Deno.test("settledMap", () => {
    Deno.test("will async map over array", async () => {
        const s = await settleMap(async (a) => await Promise.resolve(a + 1), [
            2,
            4,
            6,
        ]);
        assertEquals(s.length, 3);
        const t = s.map((s) => (s as PromiseFulfilledResult<number>).value);
        assertEquals(t, [3, 5, 7]);
    });
    Deno.test("will async map over array and reject correctly", async () => {
        const s = await settleMap(async () => await Promise.reject("foo error"), [
            2,
            4,
            6,
        ]);
        assertEquals(s.length, 3);
        const t = s.map((s) => (s as PromiseRejectedResult).reason);
        assertEquals(t, ["foo error", "foo error", "foo error"]);
    });
});

Deno.test("wait", () => {
    Deno.test("will wait for an amount of time", async () => {
        const start = Date.now();
        await wait(300);
        const end = Date.now();
        assert(end - start > 299);
        assert(end - start < 310);
    });
    Deno.test("should also work with a duration", async () => {
        const start = Date.now();
        await wait(seconds(1));
        const end = Date.now();
        assert(end - start > 999);
        assert(end - start < 1150);
    });
});

Deno.test("timeout", () => {
    Deno.test("will trigger when the timeout is reached", async () => {
        const waitingPromise = wait(1000);
        const tu = await timeout(waitingPromise, 500);
        assert(tu);
        await waitingPromise;
    });
    Deno.test("will not trigger when the timeout is not reached", async () => {
        const tu = await timeout(Promise.resolve(true), 500);
        assert(tu);
    });
    Deno.test("will also work with a duration", async () => {
        const waitingPromise = wait(1000);
        const tu = timeout(
            waitingPromise,
            Duration.fromObject({ milliseconds: 500 }),
        );
        assertRejects(() => tu);
        await waitingPromise;
    });
});
