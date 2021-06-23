import { createTable, createLazyTable } from './utils/lists';
import { Student } from './types/interfaces'
import { students } from './examples/students'

const selectableStudents = createTable(students)

const lazyStudentsTable = createLazyTable<Student>();
const selection = lazyStudentsTable
	.select('Name').select('StudentNumber', 'Surname')
	.include('Grades', t => t.select('CourseId'))
	.apply(selectableStudents)

// eslint-disable-next-line no-console
console.log(JSON.stringify(selection));
