import {Order, FunType, UnitType, OnlyArray, GetInnerEntity} from '../types/utils';

export type TableType<T, R> = {
    o: T[],
    r: R[],
    Select: <K extends keyof T>(...k: K[]) => TableType<Omit<T, K>, Pick<T, K> & R>,
    Include: <K extends keyof OnlyArray<T>, t1, r1>(entity: K, q: (t: TableType<GetInnerEntity<T, K>, UnitType>) => TableType<t1, r1>) => TableType<Omit<T, K>, { K: r1[] } & R>,
    Orderby: <K extends keyof R>(order: Order, by: K) => TableType<T, R>
}

export type LazyTableType<T1, T2, R> = {
	q: FunType<TableType<T1, UnitType>, TableType<T2, R>>,
    Select: <K extends keyof T2>(...k: K[]) => LazyTableType<T1, Omit<T2, K>, Pick<T2, K> & R>
    Include: <K extends keyof OnlyArray<T2>, t1, r1>(entity: K, q: (t: TableType<GetInnerEntity<T2, K>, UnitType>) => TableType<t1, r1>) => LazyTableType<T1, Omit<T2, K>, { K: r1[] } & R>
    Orderby: <K extends keyof R>(order: Order, by: K) => LazyTableType<T1, T2, R>
    Apply: (v: T1[]) => R[]
}
