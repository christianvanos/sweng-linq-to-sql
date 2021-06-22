import * as Utils from '../utils/utils';

export type initialTable<T> = {
    object: Array<T>,
    // eslint-disable-next-line no-use-before-define
    select: <K extends keyof T>(...selectedFields: Array<K>) => workingTable<Omit<T, K>, Pick<T, K>>
}

export type workingTable<T, R> = {
    object: Array<T>,
    result: Array<R>,
    select: <K extends keyof T>(...selectedFields: Array<K>) => workingTable<Omit<T, K>, Pick<T, K>>,
    include: <K extends keyof Utils.includeArrays<T>, S, r>(entity: K, q: (selectable: initialTable<Utils.getKeysFromArray<T, K>>) => workingTable<S, r>) => workingTable<Omit<T, K>, R & { [key in K]: Array<r> }>,
    where: () => void // TODO @caslay
}
