import * as Utils from '../utils/utils';

export type table<T, R> = {
    object: Array<T>,
    result: Array<R>,
    select: <K extends keyof T>(...selectedFields: Array<K>) => table<Omit<T, K>, Pick<T, K>>,
    include: <K extends keyof Utils.includeArrays<T>, S, r>(entity: K, q: (selectable: table<Utils.getKeysFromArray<T, K>, Utils.Unit>) => table<S, r>) => table<Omit<T, K>, R & { [key in K]: Array<r> }>,
    where: () => void // TODO @caslay
}

export type lazyTable<T1, T2, R> = {
	query: Utils.Fun<table<T1, Utils.Unit>, table<T2, R>>,
    select: <K extends keyof T2>(...properties: K[]) => lazyTable<T1, Omit<T2, K>, Pick<T2, K>>
    include: <K extends keyof Utils.includeArrays<T2>, S, r>(entity: K, q: (selectable: table<Utils.getKeysFromArray<T2, K>, Utils.Unit>) => table<S, r>) => lazyTable<T1, Omit<T2, K>, R & { [key in K]: Array<r> }>
    where: () => void // TODO @caslay
    apply: (data: T1[]) => R[]
}
