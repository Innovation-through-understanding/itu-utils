# Common functions and structures

## Debugging

`debug`
: can be used to directly debug expressions in a functional member. It will print out the result of the expression with a freely defined message, but will leave the expression itself untouched. This
is especially useful when debugging functional code or lambda functions.

## Arrays and lists

`arrayToRecord`
: converts an array of objects with a distinct identifier property into an object of objects (Dictionary) using this id property

`containsValue`
: will test an array, string, or monad on whether it contains the given value. The function also accepts undefined or null input and will return false in that case.

## Functional arithmetics and tests

`isNotZero`
: if the first parameter is not 0, will return the expression given in the second parameter

`isZero`
: if the first parameter is 0, will return the expression given in the second parameter

`isNotNil`
: returns true if the given expression is neither null nor undefined

`noop`
: Does nothing. Can be used anywhere where a function is needed that is not returning anything and has no side-effects

## Handling time spans and date/time

ITU projects rely on `luxon` to properly deal with time, date, and durations.

`@itu/utils` provides an immutable `Timestamp` value type in addition so you no longer need to work with plain numbers. The timestamp is always measured in milliseconds since Jan. 1st 1970.

!> If you create a timestamp from a normal UNIX timestamp in seconds, conversion to milliseconds will happen automatically! Note that this a heuristic (conversion happens if value is below 100000000000) and
may fail.

This library also adds some additonal functions to make your life even a little bit easier:

`toTimestamp`
: When called without any parameter, will return an UTC timestamp for the current datetime. Can also be called with a `DateTime` object to get a timestamp for another datetime.

`fromTimestamp`
: Will convert a timestamp into a `DateTime` object in the _local_ timezone.

`fromTimestampToUtc`
: Will convert a timestamp into a `DateTime` object in the _UTC_ timezone.

`ìsTimestamp`
: Type guard to check if an arbitrary variable holds a `Timestamp` value type.

`seconds, minutes, hours, days, weeks, months, years`
: Helper functions returning a `Duration` equal to the given amount of time

!> All functions dealing with durations should be able to receive either milliseconds (as a number) or a luxon `Duration` object. Likewise, all functions dealing with specific times and dates should be able to work at least with the `Timestamp` value type and optionally might also accept luxon's `DateTime` type as an input.

!> **Never** provide timestamps as pure `number`s!

## Asynchronous helpers

The library provides some utility functions for dealing with promises:

`settleMap`
: Maps over an array of promises and returns a `Promise` of `PromiseSettledResult`s. This is meant to be used for a larger amounts of data transformations or retrievals.

`wait`
: Allows you to wait for the specified duration using a promise.

`Promise.timeout`
: Allows you to wait for another promise and will reject the promise if the original promise does not settle during the given timeout value.

Note that the `Promise` prototype gets extended by this library. `Promise.timeout` and its (changeable) default timeout value `Promise.defaults.timeout` of 5 seconds can be used everywhere if the library is imported.
