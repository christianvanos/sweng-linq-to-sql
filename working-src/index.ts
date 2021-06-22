import { createTable } from './utils/lists';
import { students } from './examples/students'

const selectableStudents = createTable(students)
const selection = selectableStudents
	.select('Name').select('StudentNumber', 'Surname')
	.include('Grades', t => t.select('CourseId'))
	.result

console.log(JSON.stringify(selection, null, 4));

//TODO @everybody variable namen veranderen en minder plagiaat achtig maken.
