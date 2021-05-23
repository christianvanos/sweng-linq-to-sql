/*
Function: OrderBy

OrderBy changes the order to ASC / DESC depending on the input value of order and the property that is used to order the object.
*/


import { ListType } from '../utils/List';

const OrderBy = <T>(obj: ListType<T>, order: ('ASC' | 'DESC'), by: string): ListType<T> => {
	return obj;
}

export default OrderBy;
