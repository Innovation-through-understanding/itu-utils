import { DateTime, Duration } from "luxon";
import R from "rambda";

import { assert, assertEquals, assertFalse } from "jsr:@std/assert";

import {
    days,
    fromTimestamp,
    fromTimestampToUtc,
    hours,
    isTimestamp,
    minutes,
    months,
    seconds,
    toTimestamp,
    weeks,
    years,
} from "../time.ts";
import { Timestamp } from "../utilityTypes/Timestamp.ts";
import { valueOf } from "../valueObjects.ts";

Deno.test("Timestamps", () => {
    Deno.test("should be comparable", () => {
        const ts1 = new Timestamp(12);
        const ts3 = new Timestamp(12);
        const ts2 = new Timestamp(24);
        assert(ts1 < ts2);
        assertFalse(ts1 > ts2);
        assert(ts1 <= ts2);
        assertFalse(ts1 >= ts2);
        assert(ts1 == ts1);
        assertFalse(ts1 == ts3);
        assert(ts1 === ts1);
        assertFalse(ts1 === ts3);
        assert(ts1.equals(ts3));
        assert(R.equals(ts1, ts3));
        assertFalse(R.equals(ts1, ts2));
    });
    Deno.test("are created properly from UNIX ms epoch", () => {
        const value = 1647527186000;
        const ts = new Timestamp(value);
        assertEquals(valueOf(ts), 1647527186000);
    });
    Deno.test("are created properly from UNIX epoch", () => {
        const value = 1647527186;
        const ts = new Timestamp(value);
        assertEquals(valueOf(ts), 1647527186000);
    });
    Deno.test("are properly type guarded", () => {
        const ts1 = new Timestamp(0);
        assert(isTimestamp(ts1));
        const ts2 = { value: 0 };
        assertFalse(isTimestamp(ts2));
    });
});

Deno.test("Time functions", () => {
    Deno.test("toTimestamp should return the correct utc timestamp", () => {
        const dt = DateTime.local();
        assertEquals(toTimestamp(dt).value, dt.toUTC().valueOf());
    });
    Deno.test("fromTimestamp should return the correct local time", () => {
        const dt = DateTime.local();
        const ts = toTimestamp(dt);
        assertEquals(fromTimestamp(ts).valueOf(), dt.valueOf());
    });
    Deno.test("fromTimestampUtc should return the correct utc time", () => {
        const dt = DateTime.local();
        const ts = toTimestamp(dt);
        assertEquals(fromTimestampToUtc(ts).valueOf(), dt.toUTC().valueOf());
    });
    Deno.test("unix epoch helpers return the correct number of milliseconds", () => {
        const secs = seconds(35).toMillis();
        const mins = minutes(14).toMillis();
        const hour = hours(20).toMillis();
        const day = days(10).toMillis();
        const week = weeks(2).toMillis();
        const month = months(3).toMillis();
        const year = years(1).toMillis();
        assertEquals(secs, Duration.fromObject({ seconds: 35 }).as("milliseconds"));
        assertEquals(mins, Duration.fromObject({ minutes: 14 }).as("milliseconds"));
        assertEquals(hour, Duration.fromObject({ hours: 20 }).as("milliseconds"));
        assertEquals(day, Duration.fromObject({ days: 10 }).as("milliseconds"));
        assertEquals(week, Duration.fromObject({ weeks: 2 }).as("milliseconds"));
        assertEquals(month, Duration.fromObject({ months: 3 }).as("milliseconds"));
        assertEquals(year, Duration.fromObject({ years: 1 }).as("milliseconds"));
    });
});
