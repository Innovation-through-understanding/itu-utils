# Value objects

The library provides a base type for value objects (simple immutable types that usually wrap one or more primitive values, see [Fowler](https://www.martinfowler.com/bliki/ValueObject.html) for an in-depth explanation of value objects) and also some utility functions to deal with those types.

```ts
type ValueObject<T> = Readonly<{
	type: string;
	value: T;
}>;
```

Use `valueOf` to extract the value from a value object in a functional manner. Use `equals` if you want to compare two value objects in a type-safe way.

> The `Timestamp` type in this library is also an implementation of `ValueObject<T>` and can be used as an example for implementing your own value objects.

```Typescript
class Timestamp implements ValueObject<number> {
	public readonly value: number;
	public readonly type = "Timestamp";
	constructor(_value: number) {
		if (_value < 100000000000) {
			this.value = _value * 1000;
		} else {
			this.value = _value;
		}
	}
}

const isTimestamp = (ts: any): ts is Timestamp => {
	return ts?.type === "Timestamp" && typeof ts?.value === "number";
};
```

!> We suggest also implementing a type guard is\[VType\] when implementing a value object \[VType\].
