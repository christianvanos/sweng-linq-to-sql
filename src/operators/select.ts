/*
Function: Select

Select filters properties from an object.

---

Usecase:

1. Standalone
students.Select("Name", "Surname")

2. Within chain
students.Select("Name", "Surname").Include("Grades", q =>
  q.Select("Grade", "CourseId" )
)

3. Error handling
students.Select("Name", "Surname").Include("Grades", q =>
  q.Select("Grade", "Address" )
)

will produce a compiler error, because Address is not a valid field in the type definition of Grade.

---

We expect this code to make use of the keyof type operator, the type homomorphism, and in general the advanced types of TypeScript. This implies that the code above will have type

*/

import { ListType, CustomList } from '../utils/List';

const Select = <a, b>(obj: ListType<a>, args: string[]): ListType<b> => {
	// eslint-disable-next-line no-console
	console.log(args);
	return CustomList<b>([]);
}

export default Select;
