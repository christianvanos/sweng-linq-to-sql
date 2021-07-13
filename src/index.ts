import { CreateLazyTable } from './utils/tables';
import { Student } from './types/models'
import { Students } from './examples/students'

const LazyStudentsTable = CreateLazyTable<Student>();

const Select = LazyStudentsTable
	.Select('Name').Apply(Students)

const Include = LazyStudentsTable
	.Select('Name').Select('StudentNumber', 'Surname')
	.Include('Grades', t => t.Select('CourseId'))
	.Apply(Students)

const Orderby = LazyStudentsTable
	.Select('Name', 'StudentNumber').Orderby('ASC', 'StudentNumber')
	.Apply(Students)

console.log(`Select: ${JSON.stringify(Select, null, 1)}`);
console.log(`Include: ${JSON.stringify(Include, null, 1)}`);
console.log(`Orderby: ${JSON.stringify(Orderby, null, 1)}`);
