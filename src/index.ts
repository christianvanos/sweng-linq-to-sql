import { CreateLazyTable } from './utils/tables';
import { iStudent, Students } from './examples/students'

const LazyStudentsTable = CreateLazyTable<iStudent>();

const Select = LazyStudentsTable
	.Select('Name')
	.Apply(Students)

const Include = LazyStudentsTable
	.Select('Name')
	.Select('StudentNumber', 'Surname')
	.Include('Grades', t => t.Select('CourseId'))
	.Apply(Students)

const Orderby = LazyStudentsTable
	.Select('Name', 'StudentNumber')
	.Orderby('ASC', 'StudentNumber')
	.Apply(Students)

console.log(`Select: ${Select}`);
console.log(`Include: ${Include}`);
console.log(`Orderby: ${Orderby}`);
