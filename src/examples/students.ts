import { Student } from '../types/models';

const StudentOne: Student = {
	Name: 'Christian',
	StudentNumber: 964032,
	Surname: 'van Os',
	Grades: [{
		Grade: 9,
		CourseId: 5
	},
	{
		Grade: 8,
		CourseId: 2
	}
	]
};

const StudentTwo: Student = {
	Name: 'Caslay',
	StudentNumber: 970621,
	Surname: 'Oort',
	Grades: [{
		Grade: 10,
		CourseId: 6
	},
	{
		Grade: 7,
		CourseId: 4
	}]
};

const StudentThree: Student = {
	Name: 'Mark',
	StudentNumber: 930468,
	Surname: 'Ernst',
	Grades: [{
		Grade: 7,
		CourseId: 4
	},
	{
		Grade: 6,
		CourseId: 1
	}]
};


export const students = [StudentOne, StudentTwo, StudentThree]
