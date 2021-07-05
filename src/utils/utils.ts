/* eslint-disable @typescript-eslint/ban-types */

export type Unit = {}

export type Order = 'ASC' | 'DESC'

export type Fun<a, b> = {
	(_:a):b,
	then:<c>(g:Fun<b, c>) => Fun<a, c>
}

export type onlyArrays<T> = 
	Pick<T, {[K in keyof T]: T[K] extends object[] ? K : never}[keyof T]>;

export type excludeArray<T> = 
	Pick<T, {[K in keyof T]: T[K] extends object[] ? never : K}[keyof T]>;

export type getKeysFromArray<T, K extends keyof onlyArrays<T>> = 
	T[K] extends (infer U)[] ? U : never;

export const Unit : Unit = {}

export const Fun = <a, b>(f:(_:a) => b) : Fun<a, b> => {
	const fun = f as Fun<a, b>
	fun.then = function<c>(this:Fun<a, b>, g:Fun<b, c>) {
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

export const sortArray = <R, K extends keyof R>(order: Order, a: R[K], b: R[K]): number => 
	(typeof a === 'string' && typeof b === 'string' ? a.localeCompare(b) : a === b ? 0 : a < b ? -1 : 1) * (order === 'ASC' ? 1 : -1);
