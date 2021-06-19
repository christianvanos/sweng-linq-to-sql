import { Selectable } from './Main';
import { students } from './exampleStudents'

const selectableStudents = Selectable(students);
const selection = selectableStudents
	.select('Name', 'Grades').select('StudentNumber', 'Surname')
	.include('ExtraArray', t => t.select('item2'))
	.result

console.log(JSON.stringify(selection, null, 4));
