import {iFun, iOrder, iEmpty} from '../types/utils';

/** The Empty variable represents an empty object */
export const Empty : iEmpty[] = [{}]

/** The Fun function makes it possible to have lazy evaluation and chains of Fun */
export const Fun = <a, b>(f:(_:a) => b) : iFun<a, b> => {
	const fun = f as iFun<a, b>
	fun.then = function(this, g) {
		return Fun(v => g(this(v)));
	}
	return fun
}

/** The Pick function picks the selected keys (k) of the object (o) and returns the new object with only the picked keys */
export const Pick = <T, K extends keyof T>(o: T, k: K[]): Pick<T, K> =>
	k.reduce((acc, k1) => ({[k1]: o[k1], ...acc}), {} as T)

/** The OmitMany function removes the keys (k) of the objects (o1) in the array of objects (o) and returns the new array of objects without these keys */
export const OmitMany = <T, K extends keyof T>(o: T[], k: K[]): Omit<T, K>[] =>
	o.map(({...o1}) => {
		k.forEach(k1 => delete o1[k1])
		return o1;
	})

/** The SortArray function sorts the values given by Array.sort and uses the order to reverse the result if needed */
export const SortArray = <R, K extends keyof R>(order: iOrder, a: R[K], b: R[K]): number =>
	(a < b ? -1 : 1) * (order === 'ASC' ? 1 : -1)
