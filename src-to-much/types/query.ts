import { Func } from '../utils/func';
import { Table, initialTable } from '../core/table';


export type Query<A, B, C> = Func<initialTable<A>, Table<B, C>>
