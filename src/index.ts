import { createLazyTable } from './utils/lists';
import { Student } from './types/interfaces'
import { students } from './examples/students'

const lazyStudentsTable = createLazyTable<Student>();
const selection = lazyStudentsTable
	.select('Name').select('StudentNumber', 'Surname')
	.include('Grades', t => t.select('CourseId'))
	.apply(students)

console.log(JSON.stringify(selection));
