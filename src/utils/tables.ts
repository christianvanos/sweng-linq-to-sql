import * as Utils from './utils';
import * as Types from '../types/tables';
import * as UtilsTypes from '../types/utils';

const table = <T, R>(o: T[], r: R[]) : Types.table<T, R> => 
	({
		o,
		r,
		select: <K extends keyof T>(...k: K[]) => 
			table(
				o.map(v => Utils.omit<T, K>(v, k)), 
				o.map((v, i) => 
					({
						...Utils.pick<T, K>(v, k), 
						...r[i]
					})
				)
			),
		include: <K extends keyof UtilsTypes.onlyArrays<T>, t1, r1>(entity: K, q: (t: Types.table<UtilsTypes.getKeysFromArray<T, K>, UtilsTypes.Unit>) => Types.table<t1, r1>) => 
			table(
				o.map(v => Utils.omit<T, K>(v, [entity])), 
				o.map((v, i) => 
					({
						...r[i], 
						[entity]: q(table(v[entity], [Utils.Unit])).r
					})
				) as ({ K : r1[]; } & R)[]
			),
		orderby: <K extends keyof R>(order: UtilsTypes.Order, by: K) => 
			table(
				o,
				r.sort((a, b) => Utils.sortArray<R, K>(order, a[by], b[by]))
			)
	})

const lazyTable = <T1, T2, R>(q: UtilsTypes.Fun<Types.table<T1, UtilsTypes.Unit>, Types.table<T2, R>>) : Types.lazyTable<T1, T2, R> => 
	({ 
		q,
		
		select: <K extends keyof T2>(...k: K[]) => 
			lazyTable(q.then(Utils.Fun(t => t.select(...k)))),
		
		include: <K extends keyof UtilsTypes.onlyArrays<T2>, S, r>(entity: K, q1: (t: Types.table<UtilsTypes.getKeysFromArray<T2, K>, UtilsTypes.Unit>) => Types.table<S, r>) => 
			lazyTable(q.then(Utils.Fun(t => t.include(entity, q1)))),
		
		orderby: <K extends keyof R>(order: UtilsTypes.Order, by: K) =>
			lazyTable(q.then(Utils.Fun(t => t.orderby(order, by)))),
		
		apply: (v) => q(table(v, [Utils.Unit])).r
	})


export const createLazyTable = <T>() : Types.lazyTable<T, T, UtilsTypes.Unit> => 
	lazyTable(Utils.Fun(t => t))

