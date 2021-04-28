// this file contains the model of the student table

import { Grade } from './grade';

export interface Student {
    name: string
    surname: string
    grades: List<Grade>
}

export const Student = (name: string, surname: string, grades: List<Grade>): Student => ({
	name,
	surname,
	grades
});
