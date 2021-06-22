import * as Utils from '../utils/utils';

export type table<T, R> = {
    object: Array<T>,
    result: Array<R>,
    select: <K extends keyof T>(...selectedFields: Array<K>) => table<Omit<T, K>, Pick<T, K>>,
    include: <K extends keyof Utils.includeArrays<T>, S, r>(entity: K, q: (selectable: table<Utils.getKeysFromArray<T, K>, Utils.Unit>) => table<S, r>) => table<Omit<T, K>, R & { [key in K]: Array<r> }>,
    where: () => void // TODO @caslay
}
