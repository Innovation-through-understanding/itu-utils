export type MapValue<T, U> = (element: T) => U;
export type SelectValue<T> = (element: T) => boolean;
export type Case<T, U> = SelectValue<T> | [select: SelectValue<T>, map: MapValue<T,U>];

export const match = <T, U = T>(...params: Array<Case<T, U>>) => (value: T): U => {
    const [head,...tail] = params;
    if (!head) {
        throw new Error("No case handles match for " + value);
    }
    const [select,map] = Array.isArray(head) ? head as [select: SelectValue<T>, map: MapValue<T,U>] : [head];
    if (select(value)) {
        return map?.(value) ?? value as unknown as U;
    } else return match<T, U>(...tail)(value);
};
