export type UnitType = Record<string, never>

export type Order = 'ASC' | 'DESC'

export type FunType<a, b> = {
	(_:a):b,
	then:<c>(g:FunType<b, c>) => FunType<a, c>
}

export type OnlyArray<T> = 
	Pick<T, {[K in keyof T]: T[K] extends unknown[] ? K : never}[keyof T]>;

export type ExcludeArray<T> = 
	Pick<T, {[K in keyof T]: T[K] extends unknown[] ? never : K}[keyof T]>;

export type GetInnerEntity<T, K extends keyof OnlyArray<T>> = 
	T[K] extends (infer U)[] ? U : never;
