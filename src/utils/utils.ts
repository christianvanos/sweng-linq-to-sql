import {Order, FunType, UnitType} from '../types/utils';

export const Unit : UnitType = {}

export const Fun = <a, b>(f:(_:a) => b) : FunType<a, b> => {
	const fun = f as FunType<a, b>
	fun.then = function<c>(this:FunType<a, b>, g:FunType<b, c>) {
		return Fun(v => g(this(v)));
	}
	return fun
}

export const Pick = <T, K extends keyof T>(o: T, k: K[]): Pick<T, K> => 
	k.map(k1 => k1 in o ? { [k1]: o[k1] } : {}).reduce((acc, val) => ({...acc, ...val})) as Pick<T, K>

export const GetKeysObject = <T>(o: T): (keyof T)[] => 
	Object.keys(o) as (keyof T)[]

export const Omit = <T, K extends keyof T>(o: T, k: (keyof T)[]): Omit<T, K> => 
	GetKeysObject(o).map(k1 => k.includes(k1) ? {} : { [k1]: o[k1] }).reduce((acc, val) => ({...acc, ...val})) as Omit<T, K>

export const SortArray = <R, K extends keyof R>(order: Order, a: R[K], b: R[K]): number => 
	(typeof a === 'string' && typeof b === 'string' ? a.localeCompare(b) : a === b ? 0 : a < b ? -1 : 1) * (order === 'ASC' ? 1 : -1);
