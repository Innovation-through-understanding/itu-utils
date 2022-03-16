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
