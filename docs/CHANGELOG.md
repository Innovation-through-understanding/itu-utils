# Changelog

## 1.3.0

-   Added the `Unpacked<>` type which allows to extract the element type from an array.

## 1.2.0

-   Added the `Unit` type and `unit()` helper function. This a mono-state type that can be used instead of void for type-safe return values.
-   Added `maybeIf` helper function to construct `Maybe` monads conditionally.

## 1.1.0

-   `Timestamp` objects are now comparable using comparism operators using javascript's [Abstract Relational Comparison](https://tc39.es/ecma262/#sec-abstract-relational-comparison)
-   added `recordToArray` function

## 1.0.0

Initial version
