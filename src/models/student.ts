// this file contains the model of the student table

import { Grade } from './grade';

export interface Student {
    name: string
    surname: string
    grades: Grade[]
}

export const Student = (name: string, surname: string, grades: Grade[]): Student => ({
	name,
	surname,
	grades
});

export default Student;
