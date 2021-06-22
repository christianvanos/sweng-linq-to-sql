import * as Utils from './utils';
import * as Types from '../types/workables';

/*
	This is the InitialTable which a user can use to work with the Mini Linq SQL program.
	It gets an array of the initial objects (Student) and has a select method.
	The select method allows it to create a workingTable where the other methods 
	(include, where, etc.) are located. The select here initializes the workingTable
	with the object and the result.

	The object holds the initial object except the selected fields (omits the selected fields)
	The result holds the selected fields (picks the selected fields).
*/
export const initialTable = function<T>(object: Array<T>) : Types.initialTable<T> {
	return {
		object: object,
		select: function<K extends keyof T>(...selectedFields: Array<K>) : Types.workingTable<Omit<T, K>, Pick<T, K>> {
			// remove the selected fields from the object and save it into newObject (omitting the selected fields)
			const newObject = object.map(v => Utils.omit<T, K>(selectedFields)(v));
			
			// include the selectedFields into the result
			const newResult = object.map(v => Array.isArray(v) ? v.map((v1) => Utils.pick<T, K>(selectedFields)(v1))[0] : Utils.pick<T, K>(selectedFields)(v));

			// eslint-disable-next-line no-use-before-define
			return workingTable<Omit<T, K>, Pick<T, K>>(newObject, newResult);
		}
	}
}

/*
	The workingTable holds all the different methods that can be used in this Linq system.

	The select method appends the selected fields to the result and omits them from the object
	
	The include method can be used to include other "Tables" (arrays) in the final result.
	This is done by removing the included "table" from the object (omitting) and adding it
	into the result after applying the query on it.

	The object holds the initial object except the selected fields (omits the selected fields)
	The result holds the selected fields (picks the selected fields).
*/
const workingTable = function<T, R>(object: Array<T>, result: Array<R>) : Types.workingTable<T, R> {
	return {
		object: object,
		result: result,
		select: function<K extends keyof T>(...selectedFields: Array<K>) : Types.workingTable<Omit<T, K>, Pick<T, K>> {
			// remove the selected fields from the object and save it into newObject (omitting the selected fields)
			const newObject = object.map(v => Utils.omit<T, K>(selectedFields)(v));
			
			// include the new selectedFields into the result and save it into newResult
			const newResult = object.map((value, index) => {
				return {...(Array.isArray(value) ? value.map((v1) => Utils.pick<T, K>(selectedFields)(v1))[0] : Utils.pick<T, K>(selectedFields)(value)), ...result[index]}
			});

			return workingTable<Omit<T, K>, Pick<T, K>>(newObject, newResult);
		},
		include: function<K extends keyof Utils.includeArrays<T>, S, r>(entity: K, q: (selectable: Types.initialTable<Utils.getKeysFromArray<T, K>>) => Types.workingTable<S, r>) : Types.workingTable<Omit<T, K>, R & { [key in K]: Array<r>}> {
			// omits the entity ("Table") from the object
			const newObject = object.map(v => Utils.omit<T, K>([entity])(v));

			// runs the query over the entity and combines it with the result to produce the new result
			const newResult = object.map((_, index) => { return {...result[index], ...{ [entity]: q(initialTable(object.map(v => v[entity]))).result[index] } as unknown as {[key in K]: Array<r>}} });

			return workingTable<Omit<T, K>, R & { [key in K]: Array<r>}>(newObject, newResult);
		},
		where: function() : void {
			// TODO @caslay
			return
		}
	}
}
