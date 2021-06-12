import Student from '../student';

import { GradeList1, GradeList2, GradeList3 } from './gradeExample';

export const Student1 = Student('Name1', 'Surname1', GradeList1);
export const Student2 = Student('Name2', 'Surname2', GradeList2);
export const Student3 = Student('Name3', 'Surname3', GradeList3);

export const Student4 = Student('Name4', 'Surname4', GradeList2);
export const Student5 = Student('Name5', 'Surname5', GradeList1);
export const Student6 = Student('Name6', 'Surname6', GradeList3);

export const Student7 = Student('Name7', 'Surname7', GradeList1);
export const Student8 = Student('Name8', 'Surname8', GradeList3);
export const Student9 = Student('Name9', 'Surname9', GradeList3);

export const StudentList1: Student[] = [Student1, Student2, Student3];
export const StudentList2: Student[] = [Student4, Student5, Student6];
export const StudentList3: Student[] = [Student7, Student8, Student9];

export default Student1;
