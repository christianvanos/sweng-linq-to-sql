interface iGrades {
    Grade: number
    CourseId: number
}
export interface iStudent {
    Name: string
    Surname: string
    Grades: iGrades[]
    StudentNumber: number
}

export const Students: iStudent[] = [
	{
		Name: 'Christian',
		StudentNumber: 964032,
		Surname: 'van Os',
		Grades: [
			{
				Grade: 9,
				CourseId: 5
			},
			{
				Grade: 8,
				CourseId: 2
			}
		]
	}, {
		Name: 'Caslay',
		StudentNumber: 970621,
		Surname: 'Oort',
		Grades: [
			{
				Grade: 10,
				CourseId: 6
			},
			{
				Grade: 7,
				CourseId: 4
			}
		]
	}, {
		Name: 'Mark',
		StudentNumber: 930468,
		Surname: 'Ernst',
		Grades: [
			{
				Grade: 7,
				CourseId: 4
			},
			{
				Grade: 6,
				CourseId: 1
			}
		]
	}
]
