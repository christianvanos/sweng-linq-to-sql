type Grades = {
    Grade: number;
    CourseId: number;
}
export type Student = {
    Name: string,
    Surname: string,
    Grades: Grades[],
    StudentNumber: number
}
