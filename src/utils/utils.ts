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
	k.reduce((acc, k1) => ({[k1]: o[k1], ...acc}), {} as T)

export const Omit = <T, K extends keyof T>({...o}: T, k: (keyof T)[]): Omit<T, K> => {
	k.forEach(k1 => delete o[k1])
	return o;
}

export const SortArray = <R, K extends keyof R>(order: Order, a: R[K], b: R[K]): number => 
	(typeof a === 'string' && typeof b === 'string' ? a.localeCompare(b) : a === b ? 0 : a < b ? -1 : 1) * (order === 'ASC' ? 1 : -1);
