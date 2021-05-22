/*
Function: Include

Include can be used to filter entries of an object using properties of another object.

---

Usecase:

1. Standalone
students.Include("Grades", q =>
  q.Select("Grade", "CourseId" )
)

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

We expect this code to make use of the keyof type operator, the type homomorphism, and in general the advanced types of TypeScript.

*/

import { ListType, CustomList } from '../utils/List';

const Include = <a, b, c>(obj: ListType<a>, l: ListType<b>): ListType<c> => {
	return CustomList<c>([]);
}

export default Include;
