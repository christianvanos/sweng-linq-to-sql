import { Student } from './Types';

const StudentOne: Student = {
	Name: 'Jonah',
	StudentNumber: 9,
	Surname: 'Kalkman',
	Grades: [{
		Grade: 3,
		CourseId: 5
	},
	{
		Grade: 1,
		CourseId: 2
	}
	],
	ExtraArray:[{
		item1: 'a',
		item2: 'a'
	},
	{
		item1: 'b',
		item2: 'b'
	}
	]
};

const StudentTwo: Student = {
	Name: 'Erik',
	StudentNumber: 1.2,
	Surname: 'Pieters',
	Grades: [{
		Grade: 3,
		CourseId: 6
	},
	{
		Grade: 4,
		CourseId: 4
	}],
	ExtraArray:[{
		item1: 'a',
		item2: 'a'
	},
	{
		item1: 'b',
		item2: 'b'
	}]
};

const StudentThree: Student = {
	Name: 'Henk',
	StudentNumber: 6.7,
	Surname: 'Pietje',
	Grades: [{
		Grade: 7,
		CourseId: 4
	},
	{
		Grade: 2,
		CourseId: 1
	}],
	ExtraArray:[{
		item1: 'a',
		item2: 'a'
	},
	{
		item1: 'b',
		item2: 'b'
	}]
};

const StudentFour: Student = {
	Name: 'Jan',
	StudentNumber: 8.9,
	Surname: 'Dijk',
	Grades: [{
		Grade: 5.5,
		CourseId: 9
	},
	{
		Grade: 2,
		CourseId: 9
	}],
	ExtraArray:[{
		item1: 'a',
		item2: 'a'
	},
	{
		item1: 'b',
		item2: 'b'
	}]
};


export const students = [StudentOne, StudentTwo, StudentThree, StudentFour]
