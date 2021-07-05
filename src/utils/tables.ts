import {Fun, Omit, Pick, Unit, SortArray} from './utils';
import {TableType, LazyTableType} from '../types/tables';
import {UnitType, FunType, Order, OnlyArray, GetInnerEntity} from '../types/utils';

const Table = <T, R>(o: T[], r: R[]) : TableType<T, R> => 
	({
		o,
		r,
		Select: <K extends keyof T>(...k: K[]) => 
			Table(
				o.map(v => Omit<T, K>(v, k)), 
				o.map((v, i) => 
					({
						...r[i],
						...Pick<T, K>(v, k)
					})
				)
			),
		Include: <K extends keyof OnlyArray<T>, t1, r1>(entity: K, q: (t: TableType<GetInnerEntity<T, K>, UnitType>) => TableType<t1, r1>) => 
			Table(
				o.map(v => Omit<T, K>(v, [entity])), 
				o.map((v, i) => 
					({
						...r[i], 
						[entity]: q(Table(v[entity], [Unit])).r
					})
				) as (R & { K : r1[]; })[]
			),
		Orderby: <K extends keyof R>(order: Order, by: K) => 
			Table(
				o,
				r.sort((a, b) => SortArray<R, K>(order, a[by], b[by]))
			)
	})

const LazyTable = <T1, T2, R>(q: FunType<TableType<T1, UnitType>, TableType<T2, R>>) : LazyTableType<T1, T2, R> => 
	({ 
		q,
		
		Select: <K extends keyof T2>(...k: K[]) => 
			LazyTable(q.then(Fun(t => t.Select(...k)))),
		
		Include: <K extends keyof OnlyArray<T2>, S, r>(entity: K, q1: (t: TableType<GetInnerEntity<T2, K>, UnitType>) => TableType<S, r>) => 
			LazyTable(q.then(Fun(t => t.Include(entity, q1)))),
		
		Orderby: <K extends keyof R>(order: Order, by: K) =>
			LazyTable(q.then(Fun(t => t.Orderby(order, by)))),
		
		Apply: (v) => q(Table(v, [Unit])).r
	})


export const CreateLazyTable = <T>() : LazyTableType<T, T, UnitType> => 
	LazyTable(Fun(t => t))

