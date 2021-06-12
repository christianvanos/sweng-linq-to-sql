import Select from '../operators/select';
import Include from '../operators/include';
import OrderBy from '../operators/orderby';
import Where from '../operators/where';

export type ListType<T> = {
    items: () => T[]

    //mandatory
    select: <a>(this:ListType<T>, ...xargs: string[]) => ListType<a>

    include: <b>(this:ListType<T>, l:ListType<b>) => ListType<T>

	//optional
    orderby: (this:ListType<T>, order: ('ASC' | 'DESC'), by: string) => ListType<T>
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: (this:ListType<T>, field: string, value: any, operator: string) => ListType<T>

	// Extra
		//error handling using variable. if set, chainables ignore their functions and just 
		error: (string | null)
		getError: (error: (string | null)) => void
		getItems: (this: ListType<T>) => T[]
}

export const CustomList = <T>(list: T[] = []) : ListType<T> => {
	return {
		items: () => { return list },
		error: null,

		select: function<a>(this:ListType<T>, ...xargs: string[] ) : ListType<a> { return Select(this, xargs) },

		include: function<b>(this:ListType<T>, l:ListType<b>) : ListType<T> { return Include(this, l) },

		orderby: function(this:ListType<T>, order: ('ASC' | 'DESC'), by:string) : ListType<T> { return OrderBy(this, order, by) },

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		where: function(this:ListType<T>, field: string, value: any, operator: string): ListType<T> { return Where(this, field, value, operator) },

		// eslint-disable-next-line no-console
		getError: (e) => { console.log(e); },
		
		getItems: function(this: ListType<T>) { return this.items(); }
	}
}
