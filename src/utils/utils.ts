import * as UtilsTypes from '../types/utils';

export const Unit : UtilsTypes.Unit = {}

export const Fun = <a, b>(f:(_:a) => b) : UtilsTypes.Fun<a, b> => {
	const fun = f as UtilsTypes.Fun<a, b>
	fun.then = function<c>(this:UtilsTypes.Fun<a, b>, g:UtilsTypes.Fun<b, c>) {
		return Fun(v => g(this(v)));
	}
	return fun
}

export const pick = <T, K extends keyof T>(object: T, keys: K[]): Pick<T, K> => 
	keys.map(key => key in object ? { [key]: object[key] } : {}).reduce((acc, val) => ({...acc, ...val})) as Pick<T, K>

export const getKeysFromObject = <T>(object: T): (keyof T)[] => 
	Object.keys(object) as (keyof T)[]

export const omit = <T, K extends keyof T>(object: T, keys: (keyof T)[]): Omit<T, K> => 
	getKeysFromObject(object).map(key => keys.includes(key) ? {} : { [key]: object[key] }).reduce((acc, val) => ({...acc, ...val})) as Omit<T, K>

export const sortArray = <R, K extends keyof R>(order: UtilsTypes.Order, a: R[K], b: R[K]): number => 
	(typeof a === 'string' && typeof b === 'string' ? a.localeCompare(b) : a === b ? 0 : a < b ? -1 : 1) * (order === 'ASC' ? 1 : -1);
