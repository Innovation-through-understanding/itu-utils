import { ValueObject } from "./ValueObject";

export class Timestamp implements ValueObject<number> {
	public readonly type = "Timestamp";
	constructor(public readonly value: number) {}
}

export const isTimestamp = (ts: any): ts is Timestamp => {
	return ts.type === "Timestamp" && typeof(ts?.value) === "number";
}
