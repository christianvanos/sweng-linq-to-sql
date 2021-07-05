export type Unit = Record<string, never>

export type Order = 'ASC' | 'DESC'

export type Fun<a, b> = {
	(_:a):b,
	then:<c>(g:Fun<b, c>) => Fun<a, c>
}

export type onlyArray<T> = 
	Pick<T, {[K in keyof T]: T[K] extends unknown[] ? K : never}[keyof T]>;

export type excludeArray<T> = 
	Pick<T, {[K in keyof T]: T[K] extends unknown[] ? never : K}[keyof T]>;

export type getInnerEntity<T, K extends keyof onlyArray<T>> = 
	T[K] extends (infer U)[] ? U : never;
