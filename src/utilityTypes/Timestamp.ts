import type { ValueObject } from "./ValueObject";

export class Timestamp implements ValueObject<number> {
    public readonly type = "Timestamp";
    constructor(public readonly value: number) {}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isTimestamp = (ts: any): ts is Timestamp => {
    return ts.type === "Timestamp" && typeof(ts?.value) === "number";
};
