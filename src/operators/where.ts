/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/*
Function: Where

Where filters on a property and a value using a operator (eq,gt,lt) and returns the entries based on specific values.
*/

import { ListType } from '../utils/List';

const Where = <T>(obj: ListType<T>, field: string, value: any, operator: string): ListType<T> => {
	return obj;
}

export default Where;
