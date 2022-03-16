import { DateTime, Duration } from "luxon";

import { toTimestamp, fromTimestamp, fromTimestampToUtc, seconds, minutes, hours, days, weeks, months, years } from "../time";

describe("Time functions", () => {
	it("toTimestamp should return the correct utc timestamp", () => {
		const dt = DateTime.local();
		expect(toTimestamp(dt).value).toBe(dt.toUTC().valueOf());
	})
	it("fromTimestamp should return the correct local time", () => {
		const dt = DateTime.local();
		const ts = toTimestamp(dt);
		expect(fromTimestamp(ts).valueOf()).toBe(dt.valueOf());
	})
	it("fromTimestampUtc should return the correct utc time", () => {
		const dt = DateTime.local();
		const ts = toTimestamp(dt);
		expect(fromTimestampToUtc(ts).valueOf()).toBe(dt.toUTC().valueOf());
	})
	it("unix epoch helpers return the correct number of milliseconds", () => {
		const secs = seconds(35);
		const mins = minutes(14);
		const hour = hours(20);
		const day = days(10);
		const week = weeks(2);
		const month = months(3);
		const year = years(1);
		expect(secs).toBe(Duration.fromObject({seconds: 35}).as("milliseconds"));
		expect(mins).toBe(Duration.fromObject({minutes: 14}).as("milliseconds"));
		expect(hour).toBe(Duration.fromObject({hours: 20}).as("milliseconds"));
		expect(day).toBe(Duration.fromObject({days: 10}).as("milliseconds"));
		expect(week).toBe(Duration.fromObject({weeks: 2}).as("milliseconds"));
		expect(month).toBe(Duration.fromObject({months: 3}).as("milliseconds"));
		expect(year).toBe(Duration.fromObject({years: 1}).as("milliseconds"));
	})
})
