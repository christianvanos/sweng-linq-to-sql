import * as Utils from '../utils/utils';

/*
T: The generic type for the object
R: The generic type for the result
*/

export type table<T, R> = {
    object: T[],
    result: R[],
    select: <K extends keyof T>(...selectedFields: K[]) => table<Omit<T, K>, Pick<T, K> & R>,
    include: <K extends keyof Utils.onlyArrays<T>, S, r>(entity: K, q: (t: table<Utils.getKeysFromArray<T, K>, Utils.Unit>) => table<S, r>) => table<Omit<T, K>, { K: r[] } & R>,
    orderby: <K extends keyof R>(order: Utils.Order, by: K) => table<T, R>
}

/*
T1: Starting object. This object will remain the same all the time. This is only used in apply to give it to the table.
T2: Current object. When functions have been called, the object is composed with another table. This way we keep the program lazy.
R: Result. When apply is used the result will be updated. Utils.Unit will be a default (an empty object) because there is no result
            apply has not been called yet due to the lazy structure of the program.
*/

export type lazyTable<T1, T2, R> = {
	q: Utils.Fun<table<T1, Utils.Unit>, table<T2, R>>,
    select: <K extends keyof T2>(...selectedFields: K[]) => lazyTable<T1, Omit<T2, K>, Pick<T2, K> & R>
    include: <K extends keyof Utils.onlyArrays<T2>, S, r>(entity: K, q: (t: table<Utils.getKeysFromArray<T2, K>, Utils.Unit>) => table<S, r>) => lazyTable<T1, Omit<T2, K>, { K: r[] } & R>
    orderby: <K extends keyof R>(order: Utils.Order, by: K) => lazyTable<T1, T2, R>
    apply: (data: T1[]) => R[]
}
