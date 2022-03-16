import { DateTime } from "luxon";

import { isTimestamp, Timestamp } from "./utilityTypes/Timestamp";
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
 
export const seconds = (t: number): number => t * 1000;
export const minutes = (t: number): number => t * 60 * seconds(1);
export const hours = (t: number): number => t * 60 * minutes(1);

export const days = (t: number): number => t * 24 * hours(1);

export const weeks = (t: number): number => t * 7 * days(1);

export const months = (t: number): number => t * 30 * days(1);

export const years = (t: number): number => t * 365 * days(1);
