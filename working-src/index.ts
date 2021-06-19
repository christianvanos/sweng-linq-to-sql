import { Selectable } from './utils/lists';
import { students } from './examples/students'

const selectableStudents = Selectable(students);
const selection = selectableStudents
	.select('Name').select('StudentNumber', 'Surname')
	.include('Grades', t => t.select('CourseId'))
	.result

console.log(JSON.stringify(selection, null, 4));
