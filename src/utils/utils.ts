/* eslint-disable @typescript-eslint/ban-types */

// These are types used in the utils/tables.ts file. To keep the project
// clean these are stored here. Otherwise it would be a very long string...
export type includeArrays<T> = 
	Pick<T, {[K in keyof T]: T[K] extends object[] ? K : never}[keyof T]>;

export type excludeArray<T> = 
	Pick<T, {[K in keyof T]: T[K] extends object[] ? never : K}[keyof T]>;

export type getKeysFromArray<T, K extends keyof includeArrays<T>> = 
	T[K] extends Array<infer U> ? U : never;

// Fun is used to compose functions to keep the program lazy.
export type Fun<a, b> = {
	(_:a):b,
	then:<c>(g:Fun<b, c>) => Fun<a, c>
}

export const Fun = <a, b>(f:(_:a) => b) : Fun<a, b> => {
	const fun = f as Fun<a, b>
	fun.then = function<c>(this:Fun<a, b>, g:Fun<b, c>) : Fun<a, c> {
		return Fun(v => g(this(v)));
	}
	return fun
}

// Unit is the default result. This is needed because there is no result by
// default because we compose functions and it does not have to be executed.
export type Unit = {}
export const Unit : Unit = {}

// Functions to execute operations on objects

export const pick = <T, K extends keyof T>(keys: K[]): Fun<T, Pick<T, K>> => 
	Fun(object =>
        keys.map(key => key in object ? { [key]: object[key] } : {}).reduce((res, o) => ({ ...res, ...o }), {}) as Pick<T, K>
	);

export const getKeysFromObject = <T>(object: T): Array<keyof T> => Object.keys(object) as Array<keyof T>

export const omit = <T, K extends keyof T>(keys: Array<keyof T>): Fun<T, Omit<T, K>> => 
	Fun(object =>
        getKeysFromObject(object).map(key => keys.includes(key) ? {} : { [key]: object[key] }).reduce((res, o) => ({ ...res, ...o }), {}) as Omit<T, K>
	);

export function sortArray<R, K extends keyof R>(order: ('ASC' | 'DESC'), by: K, a: R, b: R) : number {
	const sortOrder = order === 'ASC' ? 1 : -1;
	const currentSortA = a[by]
	const currentSortB = b[by]

	const res = typeof currentSortA === 'string' && typeof currentSortB === 'string'? 
		(() => {
			const itemOne = currentSortA.charAt(0).toUpperCase() + currentSortA.slice(1);
			const itemTwo = currentSortB.charAt(0).toUpperCase() + currentSortB.slice(1);
			return itemOne < itemTwo ? -sortOrder : itemOne > itemTwo ? sortOrder : 0;
		})()
		:
		a[by] < b[by] ? -sortOrder : 
			a[by] > b[by] ?
				sortOrder : 0;

	return res;
}
