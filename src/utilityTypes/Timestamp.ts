import type { ValueObject } from "./ValueObject.ts";

/**
 * Value class to represent timestamps (in milliseconds since 1.1.1970)
 */
export class Timestamp implements ValueObject<number> {
    public readonly value: number;
    public readonly type = "Timestamp";

    constructor(_value: number) {
        if (_value < 100000000000) {
            this.value = _value * 1000;
        } else {
            this.value = _value;
        }

        // deno-lint-ignore no-explicit-any
        (this as any)[Symbol.toPrimitive] = (_hint: string) => this.value;
    }

    public equals = (that: Timestamp) => this.value === that.value;
}
