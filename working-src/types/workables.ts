import * as Utils from '../utils/utils';

export type InitialList<T> = {
    object: Array<T>,
    // eslint-disable-next-line no-use-before-define
    select: <K extends keyof T>(...entities: Array<K>) => WorkingSchema<Omit<T, K>, Pick<T, K>>
}

export type WorkingSchema<T, R> = {
    object: Array<T>,
    result: Array<R>,
    select: <K extends keyof T>(...selectedEntites: Array<K>) => WorkingSchema<Omit<T, K>, R & Pick<T, K>>,
    include: <K extends keyof Utils.includeArrays<T>, S, r>(entity: K, query: (selectable: InitialList<Utils.getKeysFromArray<T, K>>) => WorkingSchema<S, r>) => WorkingSchema<Omit<T, K>, r & { [key in K]: Array<r> }>,
    where: () => any // TODO @caslay
}
