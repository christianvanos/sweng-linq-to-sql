import {iFun, iEmpty} from '../types/utils';
import {iTable, iLazyTable} from '../types/tables';
import {Fun, OmitMany, Pick, Empty, SortArray} from './utils';

const Table = <T, R>(o: T[], r: R[]) : iTable<T, R> =>
	({
		o,
		r,
		Select: (...keys) =>
			Table(
				OmitMany(o, keys),
				o.map((o1, i) =>
					({
						...r[i],
						...Pick(o1, keys)
					})
				)
			),
		Include: (entity, query) =>
			Table(
				OmitMany(o, [entity]),
				o.map((o1, i) =>
					({
						...r[i],
						[entity]: query(Table(o1[entity], Empty)).r
					})
				)
			),
		Orderby: (key, order) =>
			Table(
				o,
				[...r].sort((a, b) => SortArray(order, a[key], b[key]))
			)
	})

const LazyTable = <T1, T2, R>(q: iFun<iTable<T1, iEmpty>, iTable<T2, R>>) : iLazyTable<T1, T2, R> =>
	({
		q,
		Select: (...keys) =>
			LazyTable(q.then(Fun(t => t.Select(...keys)))),
		Include: (entity, query) =>
			LazyTable(q.then(Fun(t => t.Include(entity, query)))),
		Orderby: (key, order) =>
			LazyTable(q.then(Fun(t => t.Orderby(key, order)))),
		Apply: v => JSON.stringify(q(Table(v, Empty)).r, null, 1)
	})

export const CreateLazyTable = <T>() : iLazyTable<T, T, iEmpty> =>
	LazyTable(Fun(t => t))
