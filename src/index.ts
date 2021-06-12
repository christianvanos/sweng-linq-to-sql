/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */

// currently disabled eslint because this is still a pre test stage... And it annoys me....

/*

Our program works by initializing our CustomList of type T. In this case T is a Student[] of a Grade[].

CustomList has the operators implemented that return a CustomList<T> which also has the operators implemented. This allows chaining.

Error handling is handled in the functions. Using the error variable inside our CustomList<T> we store errors. This way we could
verify if everything is OK at each stage to avoid errors in later states of the chain. The user can log errors directly using
CustomList.getError();

the final result is stored in the CustomList.items property.

Lazy evaluation is done by merging the id function in the chain with functions like select and include. This way we return a new object
that we can use to chain our functions and create larger objects that contain functions which could evaluate to values when the
CustomList<T>.getItems() function is called.
*/

// Import types
import { CustomList, ListType } from './utils/List'
import Grade from './models/grade';
import Student from './models/student';

// importing Grade[] and Student[]
import { GradeList1, GradeList2, GradeList3 } from './models/Examples/gradeExample';
import { StudentList1, StudentList2, StudentList3 } from './models/Examples/studentExample';

// creating List<Student> and List<Grade>
const CustomGrades1: ListType<Grade> = CustomList(GradeList1);
const CustomGrades2: ListType<Grade> = CustomList(GradeList2);
const CustomGrades3: ListType<Grade> = CustomList(GradeList3);

const CustomStudent1: ListType<Student> = CustomList(StudentList1);
const CustomStudent2: ListType<Student> = CustomList(StudentList2);
const CustomStudent3: ListType<Student> = CustomList(StudentList3);

// Test cases
console.log(CustomStudent1.getItems());
console.log(CustomStudent1.select('name').getItems());

