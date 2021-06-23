export interface Grades {
    Grade: number;
    CourseId: number;
}
export interface Student {
    Name: string,
    Surname: string,
    Grades: Array<Grades>,
    StudentNumber: number
}
