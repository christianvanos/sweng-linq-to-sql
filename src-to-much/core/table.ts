import { List, Empty, merge_list_types, createList, Cons } from './list';
import { Pair } from './pair';
import { Omit, omitMany, omitOne } from '../utils/omit';
import { Unit } from '../types/unit';
import { pickMany, pickOne } from '../utils/pick';
import { Filter } from '../types/pickIf';
import { ListType } from '../types/listType';
import { Comperator } from '../utils/comperator';
import { mergeSort } from '../utils/mergeSort';
import { Data } from '../types/data';
import { FilterBuilder, FilterCondition } from './filterBuilder';

export interface initialTable<T> {
    data: Data<T, Unit>
    Select: <K extends keyof T>(this: initialTable<T>, ...properties: K[]) => Table<Omit<T, K>, Pick<T, K>>

}

export interface Table<T, U> {
    data: Data<T, U>

    Select: <K extends keyof T>(this: Table<T, U>, ...properties: K[]) => Table<Omit<T, K>, Pick<T, K> & U>

    Include: <K extends Filter<T, List<any>>, P extends keyof ListType<T[K]>>(
        record: K,
        q: (_: initialTable<ListType<T[K]>>) => Table<Omit<ListType<T[K]>, P>, Pick<ListType<T[K]>, P>>
    ) =>
        Table<Omit<T, K>, U & { [key in K]: /*List( We use Array for prety printing)*/Array<Pick<ListType<T[K]>, P>> }>

    Where: (filter: (_: FilterBuilder<T & U>) => FilterCondition<T & U>) => Table<T, U>

    OrderBy: <K extends keyof U>(attribute: K, order?: keyof Comperator<T>) => Table<T, U>

    GroupBy: <K extends keyof U>(attribute: K) => Table<T, U>

    toList: (this: Table<T, U>) => List<U>
}

export const initialTable = <T>(data: Data<T, Unit>): initialTable<T> => ({
	data: data,

	Select: function <K extends keyof T>(this: initialTable<T>, ...properties: K[]): Table<Omit<T, K>, Pick<T, K>> {
		return Table(this.data.map(
			first => first.map(entry => omitMany(entry, properties)),
			second => merge_list_types(second.zip(this.data.First.map(entry => pickMany(entry, properties))))
		))
	}
})

export const Table = <T, U>(data: Data<T, U>): Table<T, U> => ({
	data: data,

	Select: function <K extends keyof T>(this: Table<T, U>, ...properties: K[]): Table<Omit<T, K>, Pick<T, K> & U> {
		return Table(this.data.map(
			first => first.map(entry => omitMany(entry, properties)),
			second => merge_list_types(second.zip(this.data.First.map(entry => pickMany(entry, properties))))
		))
	},

	Include: function <K extends Filter<T, List<any>>, P extends keyof ListType<T[K]>>(
		record: K,
		q: (_: initialTable<ListType<T[K]>>) => Table<Omit<ListType<T[K]>, P>, Pick<ListType<T[K]>, P>>
	):
        Table<Omit<T, K>, U & { [key in K]: Array<Pick<ListType<T[K]>, P>> }> {
		return Table(this.data.map(
			first => first.map(entry => omitOne(entry, record)),
			second => merge_list_types(second.zip(this.data.First.map(entry =>
				({ [record]: q(createTable(entry[record] as any)).toList().reverse().toArray() })))) as any
		))
	},

	Where: function (filter: (_: FilterBuilder<T & U>) => FilterCondition<T & U>): Table<T, U> {
		let tmpFirst = this.data.First
		let tmpSecond = this.data.Second
		let result = Empty<U>()
		while (tmpFirst.Kind !== 'Empty' && tmpSecond.Kind !== 'Empty') {
			if (filter(FilterBuilder({ ...tmpFirst.Head, ...tmpSecond.Head })).condition) {
				result = Cons(tmpSecond.Head, result)
			}
			tmpFirst = tmpFirst.Tail
			tmpSecond = tmpSecond.Tail
		}
		return Table(Pair(this.data.First, result.reverse()))

	},

	OrderBy: function <K extends keyof U>(attribute: K, order: keyof Comperator<T> = 'ASC'): Table<T, U> {
		return Table(this.data.mapRight(l => mergeSort(l, attribute, order)))
	},

	GroupBy: function <K extends keyof U>(attribute: K): Table<T, U> {
		const grouped = this.data.Second.map(x => pickOne(x, attribute))
		//[{ age: 21 }, { age: 21 }, { age: 23 }, { age: 24}, { age: 24 }]
		return null!
	},

	toList: function (this: Table<T, U>): List<U> {
		return this.data.Second
	}
})

// Factory method to create a table
export const createTable = <T>(list: List<T>): initialTable<T> => {
	return initialTable(Pair(list, createList(list.count())))
}