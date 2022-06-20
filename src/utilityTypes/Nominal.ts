declare const __nominal_type: unique symbol;

export type Nominal<T, Identifier> = T & {
	readonly [__nominal_type]: Identifier;
}
