import * as Utils from './utils';
import * as Types from '../types/tables';

const table = <T, R>(object: T[], result: R[]) : Types.table<T, R> => 
	({
		object,
		result,
		select: <K extends keyof T>(...keys: K[]) => 
			table(
				object.map(v => Utils.omit<T, K>(v, keys)), 
				object.map((v, i) => 
					({
						...Utils.pick<T, K>(v, keys), 
						...result[i]
					})
				)
			),
		include: <K extends keyof Utils.onlyArrays<T>, S, r>(entity: K, q: (t: Types.table<Utils.getKeysFromArray<T, K>, Utils.Unit>) => Types.table<S, r>) => 
			table(
				object.map(v => Utils.omit<T, K>(v, [entity])), 
				object.map((v, i) => 
					({
						...result[i], 
						[entity]: q(table(v[entity], [Utils.Unit])).result
					})
				) as ({ K : r[]; } & R)[]
			),
		orderby: <K extends keyof R>(order: Utils.Order, by: K) => 
			table(
				object,
				result.sort((a, b) => Utils.sortArray<R, K>(order, a[by], b[by]))
			)
	})

const lazyTable = <T1, T2, R>(q: Utils.Fun<Types.table<T1, Utils.Unit>, Types.table<T2, R>>) : Types.lazyTable<T1, T2, R> => 
	({ 
		q,
		
		select: <K extends keyof T2>(...keys: K[]) => 
			lazyTable(q.then(Utils.Fun(t => t.select(...keys)))),
		
		include: <K extends keyof Utils.onlyArrays<T2>, S, r>(entity: K, q1: (t: Types.table<Utils.getKeysFromArray<T2, K>, Utils.Unit>) => Types.table<S, r>) => 
			lazyTable(q.then(Utils.Fun(t => t.include(entity, q1)))),
		
		orderby: <K extends keyof R>(order: Utils.Order, by: K) => 
			lazyTable(q.then(Utils.Fun(t => t.orderby(order, by)))),
		
		apply: (v) => q(table(v, [Utils.Unit])).result		
	})


export const createLazyTable = <T>() : Types.lazyTable<T, T, Utils.Unit> => 
	lazyTable(Utils.Fun(t => t))

