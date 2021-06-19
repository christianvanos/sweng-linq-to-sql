import * as Utils from './Utils';


export interface Grades {
    Grade: number;
    CourseId: number;
}

export interface ExtraArray {
    item1: string,
    item2: string
}

export interface Student {
    Name: string,
    Surname: string,
    Grades: Array<Grades>,
    ExtraArray: Array<ExtraArray>,
    StudentNumber: number
}

export type Selectable<T> = {
    object: Array<T>,
    // eslint-disable-next-line no-use-before-define
    select: <K extends keyof T>(...entities: Array<K>) => Queryable<Omit<T, K>, Pick<T, K>>
}

export type Queryable<T, R> = {
    object: Array<T>,
    result: Array<R>,
    select: <K extends keyof T>(...selectedEntites: Array<K>) => Queryable<Omit<T, K>, R & Pick<T, K>>,
    include: <K extends keyof Utils.includeArrays<T>, S, r>(entity: K, query: (selectable: Selectable<Utils.getKeysFromArray<T, K>>) => Queryable<S, r>
    ) => Queryable<Omit<T, K>, r & { [key in K]: Array<r> }>
}
