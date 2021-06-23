import { createLazyTable } from './utils/tables';
import { Student } from './types/models'
import { students } from './examples/students'

const lazyStudentsTable = createLazyTable<Student>();
const selection = lazyStudentsTable
	.select('Name').select('StudentNumber', 'Surname')
	.include('Grades', t => t.select('CourseId'))
	.apply(students)

console.log(JSON.stringify(selection));
