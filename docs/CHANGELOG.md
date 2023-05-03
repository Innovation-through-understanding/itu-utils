# Changelog

## 1.8.0

-   Added Reveal type to ease deep-inheritance debugging

## 1.7.0

-   Added match function for weakly-typed pattern matching operations

## 1.6.0

-   Package audit and dependency updates

## 1.5.0

-   Unit is now a nominal type.

## 1.4.0

-   Added the `Nominal<>` to support nominal typings.

## 1.3.0

-   Added the `Unpacked<>` type which allows to extract the element type from an array.

## 1.2.0

-   Added the `Unit` type and `unit()` helper function. This a mono-state type that can be used instead of void for type-safe return values.
-   Added `maybeIf` helper function to construct `Maybe` monads conditionally.

## 1.1.0

-   `Timestamp` objects are now comparable by comparison operators using javascript's [Abstract Relational Comparison](https://tc39.es/ecma262/#sec-abstract-relational-comparison)
-   added `recordToArray` function

## 1.0.0

Initial version
