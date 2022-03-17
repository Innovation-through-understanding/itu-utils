# Typescript tips and tricks

## Typesafe enforcement of a narrow subtype for a parameter

Assume that you want to write a function that
only accepts certain strings, e.g. a valid unix file path:

```ts
type Unixpath = string & { _brand: "path " };

function dealWitPath(p: Unixpath) {
	console.log(p);
}
```

The first thing to notice here is that you cannot instantiate any values of the `Unixpath` type (since you cannot add the \_brand property typesafely to a string).

If trying to call this function with a string (even if it contains a file path) will also lead to an error.

To properly work with `dealWithPath`, you need to define and use a _type guard_ or cast.

```typescript
function isPath(p: string): p is Unixpath {
	return p.startsWith("/");
}
```

This allows you to properly guard and call your function now:

```Typescript
const foobar = "/usr";
if (isPath(foobar)) dealWitPath(foobar);
```

## Typesafe exception handling

Recent versions of Typescript enforced that exceptions are treated as either any or unknown types. My personal preference and suggestion is to always assume errors to be `unknown` and afterwards
dive into handling specific errors:

```Typescript
class MyError extends Error {
	constructor(message: string, public additionalData: any) {
		super(message);
	}
}

const throwingFunction = () => {
	// throw new Error("This is my error");
	throw new MyError("This is my error", { payload: "foobar" });
}

try {
	throwingFunction();
} catch (e) {
	if (e instanceof MyError) {
		console.error(e.message, e.additionalData, e.stack);
	} else if (e instanceof Error) {
		console.error(e.message, e.stack);
	} else {
		console.error("This should NEVER happen!");
	}
}
```

> Depending on your code structure, not using try-catch-blocks at all and relying on functional error handling (e.g. by using the _Try_ or _Either_ monads from the `tsmonads` package) might even be a better way to deal with errors in a typesafe manner.
