# Invariants, pre- and post-conditions

`itu-utils` provides decorators and factory function to enhance arbitrary classes with the handling of preconditions, post-conditions and return type checking.

```ts
const ValueSchema = z.object({
	id: z.enum(["TYPE"]),
	name: z.string(),
	age: z.number().min(0),
});

type Value = z.infer<typeof ValueSchema>;

const isValue = invariantFactory((v: Value) => ValueSchema.safeParse(v).success, "is not a Value");
const isSchema = <T extends z.ZodObject<z.ZodRawShape>>(schema: T) =>
	invariantFactory((v: z.infer<typeof schema>) => schema.safeParse(v).success, "does not conform to schema");

class Foo {
	foo: number = 0;
	@preConditions()
	@returns(notNil)
	@postCondition(invariantFactory((instance: Foo) => instance.foo === 0, "foo should still be 0"))
	ar(@pre(notNil) bar?: string, @pre(invariantFactory(x => x < 3, "is not smaller than 1")) max?: number) {
		return bar;
	}
	@preConditions()
	br(@pre(isSchema(ValueSchema)) value: any) {
		return value;
	}
}
```
