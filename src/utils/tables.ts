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
const table = <T, R>(object: T[], result: R[]) : Types.table<T, R> => {
	return {
		object,
		result,
		select: <K extends keyof T>(...keys: K[]) : Types.table<Omit<T, K>, Pick<T, K> & R> => {
			// remove the selected fields from the object and save it into newObject (omitting the selected fields)
			const newObject = object.map(v => Utils.omit<T, K>(keys)(v));
			
			// include the new selectedFields into the result and save it into newResult
			const newResult = object.map((v, i) => {
				return {...Utils.pick<T, K>(keys)(v), ...result[i]};
			})

			return table(newObject, newResult);
		},
		include: <K extends keyof Utils.includeArrays<T>, S, r>(entity: K, q: (t: Types.table<Utils.getKeysFromArray<T, K>, Utils.Unit>) => Types.table<S, r>) : Types.table<Omit<T, K>, { K: r[]} & R> => {
			// omits the entity ("Table") from the object
			const newObject = object.map(v => Utils.omit<T, K>([entity])(v));

			// runs the query over the entity and combines it with the result to produce the new result
			const newResult = object.map((v, i) => {
				// eslint-disable-next-line no-use-before-define
				return {...result[i], [entity]: q(table(v[entity], [Utils.Unit])).result}
			}) as ({ K : r[]; } & R)[]
			
			return table(newObject, newResult);
		},
		orderby: <K extends keyof R>(order: Utils.Order, by: K) : Types.table<T, R> => {
			// No need to create a new object since this function does not work like a filter.

			// Sorting the result using a custom sorting function.
			// A custom function is needed because you do not know what you will be filtering.
			const newResult = result.sort((a, b) => Utils.sortArray<R, K>(order, a[by], b[by]));

			// returning a new table with the same object and a sorted result.
			return table(object, newResult);
		}
	}
}

const lazyTable = <T1, T2, R> (q: Utils.Fun<Types.table<T1, Utils.Unit>, Types.table<T2, R>>) : Types.lazyTable<T1, T2, R> => {
	return { 
		q,
		select: <K extends keyof T2>(...keys: K[]) : Types.lazyTable<T1, Omit<T2, K>, Pick<T2, K> & R> => 
			lazyTable(q.then(Utils.Fun(t => t.select(...keys)))),

		include: <K extends keyof Utils.includeArrays<T2>, S, r>(entity: K, q1: (t: Types.table<Utils.getKeysFromArray<T2, K>, Utils.Unit>) => Types.table<S, r>) : Types.lazyTable<T1, Omit<T2, K>, { K: r[] } & R> => 
			lazyTable(q.then(Utils.Fun(t => t.include(entity, q1)))),
		
		orderby: <K extends keyof R>(order: Utils.Order, by: K) : Types.lazyTable<T1, T2, R> => 
			lazyTable(q.then(Utils.Fun(t => t.orderby(order, by)))),
		
		apply: (v: T1[]) : R[] => 
			q(table(v, [Utils.Unit])).result
		
	}
}

/*
	initialize a lazyTable with a Functor which creates a new table
*/
export const createLazyTable = <T>() : Types.lazyTable<T, T, Utils.Unit> => {
	return lazyTable(Utils.Fun(t => t))
}
