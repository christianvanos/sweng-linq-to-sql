import * as Utils from './utils';
import * as Types from '../types/tables';
import * as UtilsTypes from '../types/utils';

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
		include: <K extends keyof UtilsTypes.onlyArrays<T>, S, r>(entity: K, q: (t: Types.table<UtilsTypes.getKeysFromArray<T, K>, UtilsTypes.Unit>) => Types.table<S, r>) => 
			table(
				object.map(v => Utils.omit<T, K>(v, [entity])), 
				object.map((v, i) => 
					({
						...result[i], 
						[entity]: q(table(v[entity], [Utils.Unit])).result
					})
				) as ({ K : r[]; } & R)[]
			),
		orderby: <K extends keyof R>(order: UtilsTypes.Order, by: K) => 
			table(
				object,
				result.sort((a, b) => Utils.sortArray<R, K>(order, a[by], b[by]))
			)
	})

const lazyTable = <T1, T2, R>(q: UtilsTypes.Fun<Types.table<T1, UtilsTypes.Unit>, Types.table<T2, R>>) : Types.lazyTable<T1, T2, R> => 
	({ 
		q,
		
		select: <K extends keyof T2>(...keys: K[]) => 
			lazyTable(q.then(Utils.Fun(t => t.select(...keys)))),
		
		include: <K extends keyof UtilsTypes.onlyArrays<T2>, S, r>(entity: K, q1: (t: Types.table<UtilsTypes.getKeysFromArray<T2, K>, UtilsTypes.Unit>) => Types.table<S, r>) => 
			lazyTable(q.then(Utils.Fun(t => t.include(entity, q1)))),
		
		orderby: <K extends keyof R>(order: UtilsTypes.Order, by: K) => 
			lazyTable(q.then(Utils.Fun(t => t.orderby(order, by)))),
		
		apply: (v) => q(table(v, [Utils.Unit])).result		
	})


export const createLazyTable = <T>() : Types.lazyTable<T, T, UtilsTypes.Unit> => 
	lazyTable(Utils.Fun(t => t))

