/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import "reflect-metadata";

import type { Invariant } from "./utilityTypes/Invariants";

/**
 * Attach decorator to any method that should test preconditions for its parameters
 * @returns preCondition method decorator
 */
export function preConditions() { return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
    const method = descriptor.value!;
    const existingRequiredParameters: Array<{parameterIndex: number, test: Function}> = Reflect.getOwnMetadata("pre", target, propertyKey) || [];
    descriptor.value = function (){
        existingRequiredParameters.forEach(({parameterIndex, test}) => {
            test(arguments[parameterIndex], `Paremeter ${parameterIndex.toString()} on function ${propertyKey}`);
        });	
        method.apply(this, arguments);
    };
};}

/**
 * Attach decorator to any method that should test postconditions for its class' state
 * @param f invariant tsting function. Receives the object itself (this) as a parameter
 * @param message Error message to throw if post conditions have not been fulfilled. Defaults to ""
 * @returns postCondition decorator
 */
export const postCondition = <T>(f: Invariant<T>, message?: string) => { return function (target: unknown, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
    const method = descriptor.value!;
    descriptor.value = function (){
        const retVal = method.apply(this, arguments);
        f(this as T, `Post condition failed: ${message ?? ""}`);
        return retVal;
    };
};
};

/**
 * Attach decorator to any method that should run an operation on its return value
 * @param f invariant tsting function. Receives the return value as parameter. Return values are ignored
 * @returns return decorator
 */
export const returns = <T>(f: Invariant<T>) => { return function (target: unknown, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
    const method = descriptor.value!;
    descriptor.value = function (){
        const retVal = method.apply(this, arguments);
        f(retVal, "Return value");
        return retVal;
    };
};
};

/**
 * Test a specific methods parameter
 * @param test invariant testing funtion. 
 * @returns pre decorator for a single function parameter
 */
export const pre = <T>(test: Invariant<T>) => { return function (target: Object, propertyKey: string, parameterIndex: number) {
    const existingRequiredParameters: Array<{parameterIndex: number, test: Invariant<T>}> = Reflect.getOwnMetadata("pre", target, propertyKey) || [];
    existingRequiredParameters.push({parameterIndex, test});
    Reflect.defineMetadata("pre", existingRequiredParameters, target, propertyKey);
};
};
