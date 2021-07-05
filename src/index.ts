import { createLazyTable } from './utils/tables';
import { Student } from './types/models'
import { students } from './examples/students'

const lazyStudentsTable = createLazyTable<Student>();

const select = lazyStudentsTable
	.select('Name').apply(students)

const include = lazyStudentsTable
	.select('Name').select('StudentNumber', 'Surname')
	.include('Grades', t => t.select('CourseId'))
	.apply(students)

const orderby = lazyStudentsTable
	.select('Name', 'StudentNumber').orderby('ASC', 'StudentNumber')
	.apply(students)

console.log('select: ' + JSON.stringify(select, null, 1));
console.log('include: ' + JSON.stringify(include, null, 1));
console.log('orderby: ' + JSON.stringify(orderby, null, 1));
