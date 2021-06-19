/* eslint-disable @typescript-eslint/ban-types */
export type Fun<a, b> = {
	(_:a):b,
	then:<c>(g:Fun<b, c>) => Fun<a, c>
}

export type includeArrays<T> = 
	Pick<T, {[K in keyof T]: T[K] extends Array<object> ? K : never}[keyof T]>;

export type excludeArray<T> = 
	Pick<T, {[K in keyof T]: T[K] extends Array<object> ? never : K}[keyof T]>;

export type getKeysFromArray<T, K extends keyof includeArrays<T>> = 
	T[K] extends Array<infer U> ? U : never;


export const Fun = <a, b>(f:(_:a) => b) : Fun<a, b> => {
	const fun = f as Fun<a, b>
	fun.then = function<c>(this:Fun<a, b>, g:Fun<b, c>) : Fun<a, c> {
		return Fun(v => g(this(v)));
	}
	return fun
}

export const pick = <T, K extends keyof T>(keys: Array<K>): Fun<T, Pick<T, K>> => 
	Fun(object =>
        keys.map(key => key in object ? { [key]: object[key] } : {}).reduce((res, o) => ({ ...res, ...o }), {}) as Pick<T, K>
	);

export const getKeysFromObject = <T>(object: T): Array<keyof T> => Object.keys(object) as Array<keyof T>

export const omit = <T, K extends keyof T>(keys: Array<keyof T>): Fun<T, Omit<T, K>> => 
	Fun(object =>
        getKeysFromObject(object).map(key => keys.includes(key) ? {} : { [key]: object[key] }).reduce((res, o) => ({ ...res, ...o }), {}) as Omit<T, K>
	);

