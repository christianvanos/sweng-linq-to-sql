import {iFun, iOrder, iEmpty} from '../types/utils';

/** The Empty variable represents an empty object */
export const Empty : iEmpty = {}

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

/** The Omit function removes the keys (k) of the object (o) and returns the new object without these keys */
export const Omit = <T, K extends keyof T>({...o}: T, k: K[]): Omit<T, K> => {
	k.forEach(k1 => delete o[k1])
	return o;
}

/** The SortArray function sorts the values given by Array.sort and uses the order to reverse the result if needed */
export const SortArray = <R, K extends keyof R>(order: iOrder, a: R[K], b: R[K]): number =>
	(typeof a === 'string' && typeof b === 'string' ? a.localeCompare(b) : a === b ? 0 : a < b ? -1 : 1) * (order === 'ASC' ? 1 : -1);
