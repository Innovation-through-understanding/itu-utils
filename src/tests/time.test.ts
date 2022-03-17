import { DateTime, Duration } from "luxon";

import { days, fromTimestamp, fromTimestampToUtc, hours, isTimestamp, minutes, months, seconds, toTimestamp, weeks, years } from "../time";
import { Timestamp } from "../utilityTypes";
import { valueOf } from "../valueObjects";

describe("Timestamps", () => {
    it("are created properly from UNIX ms epoch", () => {
        const value = 1647527186000;
        const ts = new Timestamp(value);
        expect(valueOf(ts)).toBe(1647527186000);
    });
    it("are created properly from UNIX epoch", () => {
        const value = 1647527186;
        const ts = new Timestamp(value);
        expect(valueOf(ts)).toBe(1647527186000);
    });
    it("are properly type guarded", () => {
        const ts1 = new Timestamp(0);
        expect(isTimestamp(ts1)).toBeTruthy();
        const ts2 = { value: 0 };
        expect(isTimestamp(ts2)).toBeFalsy();
    });
});

describe("Time functions", () => {
    it("toTimestamp should return the correct utc timestamp", () => {
        const dt = DateTime.local();
        expect(toTimestamp(dt).value).toBe(dt.toUTC().valueOf());
    });
    it("fromTimestamp should return the correct local time", () => {
        const dt = DateTime.local();
        const ts = toTimestamp(dt);
        expect(fromTimestamp(ts).valueOf()).toBe(dt.valueOf());
    });
    it("fromTimestampUtc should return the correct utc time", () => {
        const dt = DateTime.local();
        const ts = toTimestamp(dt);
        expect(fromTimestampToUtc(ts).valueOf()).toBe(dt.toUTC().valueOf());
    });
    it("unix epoch helpers return the correct number of milliseconds", () => {
        const secs = seconds(35).toMillis();
        const mins = minutes(14).toMillis();
        const hour = hours(20).toMillis();
        const day = days(10).toMillis();
        const week = weeks(2).toMillis();
        const month = months(3).toMillis();
        const year = years(1).toMillis();
        expect(secs).toBe(Duration.fromObject({seconds: 35}).as("milliseconds"));
        expect(mins).toBe(Duration.fromObject({minutes: 14}).as("milliseconds"));
        expect(hour).toBe(Duration.fromObject({hours: 20}).as("milliseconds"));
        expect(day).toBe(Duration.fromObject({days: 10}).as("milliseconds"));
        expect(week).toBe(Duration.fromObject({weeks: 2}).as("milliseconds"));
        expect(month).toBe(Duration.fromObject({months: 3}).as("milliseconds"));
        expect(year).toBe(Duration.fromObject({years: 1}).as("milliseconds"));
    });
});
