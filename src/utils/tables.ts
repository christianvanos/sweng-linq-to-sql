import * as Utils from './utils';
import * as Types from '../types/tables';

/*
	The table holds all the different methods that can be used in this Linq system.

	The select method appends the selected fields to the result and omits them from the object
	
	The include method can be used to include other "Tables" (arrays) in the final result.
	This is done by removing the included "table" from the object (omitting) and adding it
	into the result after applying the query on it.

	The object holds the initial object except the selected fields (omits the selected fields)
	The result holds the selected fields (picks the selected fields).
*/
const table = function<T, R>(object: T[], result: R[]) : Types.table<T, R> {
	return {
		object,
		result,
		select: function<K extends keyof T>(...selectedFields: K[]) : Types.table<Omit<T, K>, Pick<T, K>> {
			// remove the selected fields from the object and save it into newObject (omitting the selected fields)
			const newObject = object.map(v => Utils.omit<T, K>(selectedFields)(v));
			
			// include the new selectedFields into the result and save it into newResult
			const newResult = object.map((value, index) => {
				return {...Array.isArray(value) ? value.map((v1) => Utils.pick<T, K>(selectedFields)(v1))[0] : Utils.pick<T, K>(selectedFields)(value), ...result[index]}
			});

			return table<Omit<T, K>, Pick<T, K>>(newObject, newResult);
		},
		include: function<K extends keyof Utils.includeArrays<T>, S, r>(entity: K, q: (t: Types.table<Utils.getKeysFromArray<T, K>, Utils.Unit>) => Types.table<S, r>) : Types.table<Omit<T, K>, R & { [key in K]: r[]}> {
			// omits the entity ("Table") from the object
			const newObject = object.map(v => Utils.omit<T, K>([entity])(v));

			// runs the query over the entity and combines it with the result to produce the new result
			// eslint-disable-next-line no-use-before-define
			const newResult = object.map((_, index) => { return {...result[index], ...{ [entity]: q(createTable(object.map(v => v[entity]))).result[index] } as unknown as {[key in K]: r[]}} });

			return table<Omit<T, K>, R & { [key in K]: r[]}>(newObject, newResult);
		},
		orderby: function<K extends keyof R>(order: ('ASC' | 'DESC'), by: K) : Types.table<T, R> {
			// No need to create a new object since this function does not work like a filter.

			// Sorting the result using a custom sorting function.
			// A custom function is needed because you do not know what you will be filtering.
			const res = result.sort((a, b) => Utils.sortArray(order, by, a, b));

			// returning a new table with the same object and a sorted result.
			return table<T, R>(object, res);
		}
	}
}

/*
	initialize a table with an object and empty result
*/
const createTable = <T>(object: T[]): Types.table<T, Utils.Unit> => {
	return table<T, Utils.Unit>(object, [Utils.Unit])
}

const lazyTable = function<T1, T2, R> (query: Utils.Fun<Types.table<T1, Utils.Unit>, Types.table<T2, R>>) : Types.lazyTable<T1, T2, R> {
	return { 
		query,
		select: function <K extends keyof T2>(...selectedFields: K[]): Types.lazyTable<T1, Omit<T2, K>, Pick<T2, K>> {
			return lazyTable(query.then(Utils.Fun(t => t.select(...selectedFields))))
		},
		include: function<K extends keyof Utils.includeArrays<T2>, S, r>(entity: K, q: (t: Types.table<Utils.getKeysFromArray<T2, K>, Utils.Unit>) => Types.table<S, r>) {
			return lazyTable(query.then(Utils.Fun(t => t.include(entity, q))))
		},
		orderby: function<K extends keyof R>(order: ('ASC' | 'DESC'), by: K) {
			return lazyTable(query.then(Utils.Fun(t => t.orderby(order, by))))
		},
		apply: function (data: T1[]): R[] {
			return query(createTable(data)).result
		}
	}
}

/*
	initialize a lazyTable with a Functor which creates a new table
*/
export const createLazyTable = <T>(): Types.lazyTable<T, T, Utils.Unit> => {
	return lazyTable(Utils.Fun(t => t))
}
