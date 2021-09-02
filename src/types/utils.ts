/** The iEmpty type represent an empty object */
export type iEmpty = Record<string, never>

/** The iFun is the interface of the Fun function (lazy evaluation) */
export interface iFun<a, b> {
	(_:a):b
	then:<c>(g:iFun<b, c>) => iFun<a, c>
}

/** The iOrder type is a union of 'ASC' and 'DESC' allows only this order for sorting */
export type iOrder = 'ASC' | 'DESC'

/** The IncludeArray has as input an object. It will return the object with only the arrays inside */
export type IncludeArray<T> =
	Pick<T, {[K in keyof T]: T[K] extends unknown[] ? K : never}[keyof T]>;

/** Will return the InnerArray inside a object */
export type InnerArray<T, K extends keyof IncludeArray<T>> =
	T[K] extends (infer U)[] ? U : never;
