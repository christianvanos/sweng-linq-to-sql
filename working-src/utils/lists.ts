import * as Utils from './utils';
import * as Types from '../types/workables';

export const InitialList = function<T>(object: Array<T>) : Types.InitialList<T> {
	return {
		object: object,
		select: function<K extends keyof T>(...entities: Array<K>) : Types.WorkingSchema<Omit<T, K>, Pick<T, K>> {
			const newResult = <any>([]);

			object.forEach((value, index) => {
				if(Array.isArray(value) && Object.keys(value).length > 1){
					const subArray: any = object[index] as any
					newResult[index] = []
					subArray.forEach((innerValue: any) => { 
						newResult[index].push(Utils.pick<T, K>(entities)(innerValue))
					})
				} else {
					newResult[index] = Utils.pick<T, K>(entities)(object[index])
				}
			})

			const newObject = <any>([])
			object.forEach(element => { newObject.push(Utils.omit<T, K>(entities)(element)); });

			// eslint-disable-next-line no-use-before-define
			return WorkingSchema<Omit<T, K>, Pick<T, K>>(newObject, newResult);
		}
	}
}

export const WorkingSchema = function<T, R>(object: Array<T>, result: Array<R>) : Types.WorkingSchema<T, R> {
	return {
		object: object,
		result: result,
		select: function<K extends keyof T>(...selectedEntities: Array<K>) : Types.WorkingSchema<Omit<T, K>, R & Pick<T, K>> {
			const newResult = <any>([]);

			object.forEach((value, index) => { 
				newResult[index] = {...<any>result[index], ...Utils.pick<T, K>(selectedEntities)(value)}
				
				if(Array.isArray(value)) {
					newResult[index] = []
					
					for(let g = 0; g < Object.keys(value).length; g++) {
						newResult[index][g] = {...(<any>result)[index][g], ...Utils.pick<T, K>(selectedEntities)(value[g])};
					}
				}
			});

			const newObject = <any>([])
			object.forEach(element => { newObject.push(Utils.omit<T, K>(selectedEntities)(element)); });

			return WorkingSchema<Omit<T, K>, R & Pick<T, K>>(newObject, newResult);
		},
		include: function<K extends keyof Utils.includeArrays<T>, S, r>(entity: K, query: (selectable: Types.InitialList<Utils.getKeysFromArray<T, K>>) => Types.WorkingSchema<S, r>) : Types.WorkingSchema<Omit<T, K>, r & { [key in K]: Array<r> }> {
			const keysFromEntity = object.map(v => v[entity])
			const newObject = object.map(v => Utils.omit<T, K>([entity])(v));

			const selectableFromEntity = InitialList(keysFromEntity);

			const queryResult = query(selectableFromEntity).result;

			const newResult = <any>([]);
			for(let i = 0; i < object.length; i++){
				newResult[i] = {...result[i], ...{ [entity]: (<any>queryResult)[i] } as {[key in K]: Array<r> }}
			}

			return WorkingSchema<Omit<T, K>, r & { [key in K]: Array<r> }>(newObject, newResult);
		}
	}
}
