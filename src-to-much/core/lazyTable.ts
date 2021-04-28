import { Func } from '../utils/func';
import { Omit } from '../utils/omit';
import { List } from './list';
import { Unit } from '../types/unit';
import { Filter } from '../types/pickIf';
import { ListType } from '../types/listType';
import { Comperator } from '../utils/comperator';
import { Table, initialTable } from './table';
import { Query } from '../types/query';
import { FilterBuilder, FilterCondition } from './filterBuilder';

interface LazyTable<T1, T2, U> {
    query: Query<T1, T2, U>

    Select: <K extends keyof T2>(...properties: K[]) => LazyTable<T1, Omit<T2, K>, U & Pick<T2, K>>

    Include: <K extends Filter<T2, List<any>>, P extends keyof ListType<T2[K]>>(
        record: K,
        q: (_: initialTable<ListType<T2[K]>>) => Table<Omit<ListType<T2[K]>, P>, Pick<ListType<T2[K]>, P>>
    ) => LazyTable<T1, Omit<T2, K>, U & { [key in K]: Array<Pick<ListType<T2[K]>, P>> }>

    Where: (filter: (_: FilterBuilder<T2 & U>) => FilterCondition<T2 & U>) => LazyTable<T1, T2, U>

    OrderBy: <K extends keyof U>(attribute: K, order?: keyof Comperator<T2>) => LazyTable<T1, T2, U>

    apply: (data: initialTable<T1>) => Table<T2, U>
}

interface initialLazyTable<T> {
    query: Query<T, T, Unit>

    Select: <K extends keyof T>(...properties: K[]) => LazyTable<T, Omit<T, K>, Pick<T, K>>
}

const initialLazyTable = <T>(q: Query<T, T, Unit>): initialLazyTable<T> => ({
	query: q,

	Select: function <K extends keyof T>(...properties: K[]): LazyTable<T, Omit<T, K>, Pick<T, K>> {
		return LazyTable(this.query.then(Func(table => table.Select(...properties))))
	}
})

const LazyTable = <T1, T2, U>(q: Query<T1, T2, U>): LazyTable<T1, T2, U> => ({
	query: q,

	Select: function <K extends keyof T2>(...properties: K[]): LazyTable<T1, Omit<T2, K>, U & Pick<T2, K>> {
		return LazyTable(this.query.then(Func(table => table.Select(...properties))))
	},

	Include: function <K extends Filter<T2, List<any>>, P extends keyof ListType<T2[K]>>(
		record: K,
		q1: (_: initialTable<ListType<T2[K]>>) => Table<Omit<ListType<T2[K]>, P>, Pick<ListType<T2[K]>, P>>
	): LazyTable<T1, Omit<T2, K>, U & { [key in K]: Array<Pick<ListType<T2[K]>, P>> }> {
		return LazyTable(this.query.then(Func(table => table.Include(record, q1))))
	},

	Where: function (filter: (_: FilterBuilder<T2 & U>) => FilterCondition<T2 & U>): LazyTable<T1, T2, U> {
		return LazyTable(this.query.then(Func(table => table.Where(filter))))
	},

	OrderBy: function <K extends keyof U>(attribute: K, order: keyof Comperator<T2> = 'ASC'): LazyTable<T1, T2, U> {
		return LazyTable(this.query.then(Func(table => table.OrderBy(attribute, order))))
	},

	apply: function (data: initialTable<T1>): Table<T2, U> {
		return this.query.f(data)
	}
})


export const createLazyTable = <T>(): initialLazyTable<T> => {
	return LazyTable(Func(initTable => Table(initTable.data)))
}

