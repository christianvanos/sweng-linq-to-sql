/* eslint-disable @typescript-eslint/no-unused-vars */
// currently disabled eslint because this is still a pre test stage... And it annoys me....

/*

Our program works by initializing our CustomList of type T. In this case T is a Student[] of a Grade[].

CustomList has the operators implemented that return a CustomList<T> which also has the operators implemented. This allows chaining.

Error handling is handled in the functions. Using the error variable inside our CustomList<T> we store errors. This way we could
verify if everything is OK at each stage to avoid errors in later states of the chain. The user can log errors directly using
CustomList.getError();

the final result is stored in the CustomList.items property.

//TODO: Implement lazy evaluation: https://en.wikipedia.org/wiki/Lazy_evaluation (REQUIRED!)
*/

import { CustomList, ListType } from './utils/List'

// importing Grade[] and Student[]
import { GradeList1, GradeList2, GradeList3 } from './models/Examples/gradeExample';
import { Student1, Student2, Student3 } from './models/Examples/studentExample';

// creating List<Student> and List<Grade>
const CustomGrades1: ListType<Grade> = CustomList(GradeList1);
const CustomGrades2: ListType<Grade> = CustomList(GradeList2);
const CustomGrades3: ListType<Grade> = CustomList(GradeList3);

const CustomStudent1: ListType<Student> = CustomList(Student1);
const CustomStudent2: ListType<Student> = CustomList(Student2);
const CustomStudent3: ListType<Student> = CustomList(Student3);

// Test cases

CustomStudent1.select(['name']);
