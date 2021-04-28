import { List, Cons } from '../core/list';
import { Comperator } from './comperator';

// support method for Table.OrderBy, using mergeSort
const merge = <T>(l1: List<T>, l2: List<T>, property: keyof T, order: keyof Comperator<T>): List<T> => {
	if (l1.Kind === 'Empty') {
		return l2
	} else if (l2.Kind === 'Empty') {
		return l1
	} 
	if (Comperator(l2.Head[property])[order].f(l1.Head[property])) {
		return Cons(l1.Head, merge(l1.Tail, l2, property, order))
	} 
	return Cons(l2.Head, merge(l1, l2.Tail, property, order))
        
    
}

export const mergeSort = <T>(list: List<T>, property: keyof T, order: keyof Comperator<T>): List<T> => {
	const size = list.count()
	if (size <= 1) {
		return list
	} 
	const divider = 2;
	const middle = Math.floor(size / divider -1)
	const p = list.splitAt(middle)
	const left = mergeSort(p.First, property, order)
	const right = mergeSort(p.Second, property, order)
	return merge(left, right, property, order)
    
}
