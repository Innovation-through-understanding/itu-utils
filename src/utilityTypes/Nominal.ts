declare const __nominal_type: unique symbol;

/** @deprecated we represent nominal types via zod's brand() schema function, which is the preferred way of declaring nominal types. */
export type Nominal<T, Identifier> = T & {
	readonly [__nominal_type]: Identifier;
};
