import * as Utils from './utils';
import * as Types from '../types/tables';

const table = <T, R>(object: T[], result: R[]) : Types.table<T, R> => {
	return {
		object,
		result,
		select: <K extends keyof T>(...keys: K[]) => {
			const newObject = object.map(v => Utils.omit<T, K>(keys)(v));
			const newResult = object.map((v, i) => {
				return {
					...Utils.pick<T, K>(keys)(v), 
					...result[i]
				};
			})

			return table(newObject, newResult);
		},
		include: <K extends keyof Utils.onlyArrays<T>, S, r>(entity: K, q: (t: Types.table<Utils.getKeysFromArray<T, K>, Utils.Unit>) => Types.table<S, r>) => {
			const newObject = object.map(v => Utils.omit<T, K>([entity])(v));
			const newResult = object.map((v, i) => {
				return {
					...result[i], 
					[entity]: q(table(v[entity], [Utils.Unit])).result
				}
			}) as ({ K : r[]; } & R)[];
			
			return table(newObject, newResult);
		},
		orderby: <K extends keyof R>(order: Utils.Order, by: K) => {
			const newResult = result.sort((a, b) => Utils.sortArray<R, K>(order, a[by], b[by]));

			return table(object, newResult);
		}
	}
}

const lazyTable = <T1, T2, R>(q: Utils.Fun<Types.table<T1, Utils.Unit>, Types.table<T2, R>>) : Types.lazyTable<T1, T2, R> => {
	return { 
		q,
		
		select: <K extends keyof T2>(...keys: K[]) => 
			lazyTable(q.then(Utils.Fun(t => t.select(...keys)))),
		
		include: <K extends keyof Utils.onlyArrays<T2>, S, r>(entity: K, q1: (t: Types.table<Utils.getKeysFromArray<T2, K>, Utils.Unit>) => Types.table<S, r>) => 
			lazyTable(q.then(Utils.Fun(t => t.include(entity, q1)))),
		
		orderby: <K extends keyof R>(order: Utils.Order, by: K) => 
			lazyTable(q.then(Utils.Fun(t => t.orderby(order, by)))),
		
		apply: (v) => q(table(v, [Utils.Unit])).result		
	}
}

export const createLazyTable = <T>() : Types.lazyTable<T, T, Utils.Unit> => {
	return lazyTable(Utils.Fun(t => t))
}
