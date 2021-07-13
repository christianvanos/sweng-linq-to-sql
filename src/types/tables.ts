import {iFun, iOrder, iEmpty, IncludeArray, InnerArray} from '../types/utils';

/**
 * Interface for the Table
 * @param o is the working object array of generic type T
 * @param r is the resulting object array of generic type R
 */
export interface iTable<T, R> {
    o: T[]
    r: R[]
    /**
     * Interface for the Select method
     * @type K type is a union of the selected keys of T
     * @param keys is an array of the selected keys
     * @return a new Table with the with Omit and Pick on the objects
     */
    Select: <K extends keyof T>(...keys: K[]) => iTable<Omit<T, K>, R & Pick<T, K>>
    /**
     * Interface for the Include method
     * @type K is the selected entity
     * @type t1 is the type of the working object of the included array
     * @type r1 is the type of the result object of the included array
     * @param entity is the key name of the included array in string format
     * @param query is an arrow function with as input the starting table and it output the table where the query has ran on
     * @return a new table with the included array omitted from the workingObject and the result of the query and the normal result object combined
     */
    Include: <K extends keyof IncludeArray<T>, t1, r1>(entity: K, query: (t: iTable<InnerArray<T, K>, iEmpty>) => iTable<t1, r1>) => iTable<Omit<T, K>, R & { [entity: string]: r1[] }>
    /**
     * Interface for the OrderBy method
     * @type K is the selected key that is in the result object as string
     * @param order is the order which is it will be sorted in ('ASC' | 'DESC')
     * @param by is the selected key we will do the sorting with
     * @return a new Table with the sorted result
     */
    Orderby: <K extends keyof R>(order: iOrder, by: K) => iTable<T, R>
}

/**
 * Interface for the LazyTable
 * @param q holds the chain of functions which are generated in the lazy evaluation process
 */
export interface iLazyTable<T1, T2, R> {
	q: iFun<iTable<T1, iEmpty>, iTable<T2, R>>
    Select: <K extends keyof T2>(...keys: K[]) => iLazyTable<T1, Omit<T2, K>, R & Pick<T2, K>>
    Include: <K extends keyof IncludeArray<T2>, t1, r1>(entity: K, query: (t: iTable<InnerArray<T2, K>, iEmpty>) => iTable<t1, r1>) => iLazyTable<T1, Omit<T2, K>, R & { [entity: string]: r1[] }>
    Orderby: <K extends keyof R>(order: iOrder, by: K) => iLazyTable<T1, T2, R>
    Apply: (v: T1[]) => string
}
