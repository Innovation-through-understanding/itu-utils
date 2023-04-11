# Pattern matching

_Pattern matching_ is quite common in many functional languages like _Haskell, Scala, Elixir,_ and _Elm_. It is generally hard to implement in languages without strong static type systems. The `match` function and its utility types in this library try to at least emulate the power of pattern matching in some way, while still providing at least a little type-safety.

Patterns consists of a value _selector_ and an optional value _mapper_. Use the selector to define the pattern that should be matched (it is a predicate similar to the one `Array.filter()` is receiving).
Use the mapper the actually change your result value. This can be an arbitrary function that takes the matched value as an input parameter. If omitted, the matcher will just return the value that was matched by the selector.

_Selectors_ are tested in the given order. The first _selector_ that matches will be used.

For example, you can use to define a pattern matcher for numbers:

```ts
const numberMatcher = match<number, number | string>(
	[m => m > 11 && m < 20, _ => "Between 12 and 19"],
	[m => m < 6, _ => "Smaller than 6"],
	m => m == 10, // Will just return the value itself
	[_ => true, _ => "Fall through"]
);

expect(numberMatcher(1)).toBe("Smaller than 6");
expect(numberMatcher(10)).toBe(10);
expect(numberMatcher(14)).toBe("Between 12 and 19");
expect(numberMatcher(10101010)).toBe("Fall through");
```

Compared to other languages, this approach still lacks some elegance. It's tedious to give additional type information to the matcher definition. Even for the default case, you still have to define a matcher. Also notice that there is no kind of type narrowing involved, since selectors are evaluated at runtime only. Mappers therefore might need to do some explicit type narrowing or casting by themselves.
