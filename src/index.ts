/*

Our program works by initializing our CustomList of type T. In this case T is a Student[] of a Grade[].

CustomList has the operators implemented that return a CustomList<T> which also has the operators implemented. This allows chaining.

Error handling is handled in the functions. Using the error variable inside our CustomList<T> we store errors. This way we could
verify if everything is OK at each stage to avoid errors in later states of the chain. The user can log errors directly using
CustomList.getError();

the final result is stored in the CustomList.items property.
*/

import { CustomList } from './utils/List'

// importing our models
import { Student } from './models/student';
import { Grade } from './models/grade';

// creating List<Student> and List<Grade>

// Test cases