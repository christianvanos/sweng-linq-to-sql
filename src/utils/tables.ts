import {iFun, iEmpty} from '../types/utils';
import {iTable, iLazyTable} from '../types/tables';
import {Fun, OmitMany, Pick, Empty, SortArray} from './utils';

const Table = <T, R>(o: T[], r: R[] = Empty as R[]): iTable<T, R> =>
	({
		o, // Working Object
		r, // Result Object
		Select: (...keys) =>
			Table(
				OmitMany(o, keys), // Remove selected keys from working object
				o.map((o1, i) => // Loop trough working object and pick the selected keys and combine them with the result object per index
					({
						...r[i],
						...Pick(o1, keys)
					})
				)
			),
		Include: (entity, query) =>
			Table(
				OmitMany(o, [entity]), // Remove the entity from the working object
				o.map((o1, i) => // Loop trough working object and add the entity with result of query and combine them with the result object per index
					({
						...r[i],
						[entity]: query(Table(o1[entity])).r
					})
				)
			),
		Orderby: (key, order) =>
			Table(
				o, // Untouched working object
				[...r].sort((a, b) => SortArray(order, a[key], b[key])) // Sorted result object
			)
	})

const LazyTable = <T1, T2, R>(q: iFun<iTable<T1, iEmpty>, iTable<T2, R>>) : iLazyTable<T1, T2, R> =>
	({
		q,
		Select: (...keys) =>
			LazyTable(q.then(Fun(t => t.Select(...keys)))), // Call Select of the Table in a lazy way and add it to the chain
		Include: (entity, query) =>
			LazyTable(q.then(Fun(t => t.Include(entity, query)))), // Call Include of the Table in a lazy way and add it to the chain
		Orderby: (key, order) =>
			LazyTable(q.then(Fun(t => t.Orderby(key, order)))), // Call Orderby of the Table in a lazy way and add it to the chain
		Apply: v => JSON.stringify(q(Table(v)).r, null, 1) // Call the chain of functions with the value and return the json string of the result
	})

export const CreateLazyTable = <T>() : iLazyTable<T, T, iEmpty> =>
	LazyTable(Fun(t => t))
