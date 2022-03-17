import { DateTime, Duration } from "luxon";

import { Timestamp } from "./utilityTypes/Timestamp";
import { valueOf } from "./valueObjects";

/**
 * Create a utc timestamp from a DateTime object
 * @param dt DateTime (default to now)
 * @returns Timestamp
 */
export const toTimestamp = (dt: DateTime = DateTime.local()): Timestamp => new Timestamp(dt.toUTC().valueOf());

/**
  * Create a UTC DateTime object from a timestamp
  * @param ts Timestamp
  * @returns UTC DateTime object
  */
export const fromTimestampToUtc = (ts: number | Timestamp): DateTime => {
    if (isTimestamp(ts)) {
        return DateTime.fromMillis(valueOf(ts), { zone: "UTC" });	
    }
    return DateTime.fromMillis(ts, { zone: "UTC" });
};

/**
  * Create a DateTime object from a timestamp
  * @param ts Timestamp
  * @returns DateTime object (local time)
  */
export const fromTimestamp = (ts: number | Timestamp): DateTime => fromTimestampToUtc(ts).toLocal();

/**
 * Typeguard checking whether the given enity is a timestamp
 * @param ts an arbitrary object
 * @returns whether ts is of type Timestamp
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isTimestamp = (ts: any): ts is Timestamp => {
    return ts?.type === "Timestamp" && typeof(ts?.value) === "number";
};

// Fast creation methods for durations

/**
 * Create a duration describing the given amount of seconds
 * @param t seconds
 * @returns Duration object
 */
export const seconds = (t: number): Duration => Duration.fromObject({seconds: t});

/**
 * Create a duration describing the given amount of minutes
 * @param t minutes
 * @returns Duration object
 */
export const minutes = (t: number): Duration => Duration.fromObject({minutes: t});

/**
 * Create a duration describing the given amount of hours
 * @param t hours
 * @returns Duration object
 */
export const hours = (t: number): Duration => Duration.fromObject({hours: t});

/**
 * Create a duration describing the given amount of days
 * @param t days
 * @returns Duration object
 */
export const days = (t: number): Duration => Duration.fromObject({days: t});

/**
 * Create a duration describing the given amount of weeks
 * @param t weeks
 * @returns Duration object
 */
export const weeks = (t: number): Duration => Duration.fromObject({weeks: t});

/**
 * Create a duration describing the given amount of months
 * @param t months
 * @returns Duration object
 */
export const months = (t: number): Duration => Duration.fromObject({months: t});

/**
 * Create a duration describing the given amount of years
 * @param t years
 * @returns Duration object
 */
export const years = (t: number): Duration => Duration.fromObject({years: t});
