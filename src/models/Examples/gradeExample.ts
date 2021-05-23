/* eslint-disable no-magic-numbers */
import Grade from '../grade';

const grade1 = Grade(8, 1);
const grade2 = Grade(6, 2)
const grade3 = Grade(1, 3);

const grade4 = Grade(10, 1);
const grade5 = Grade(4, 2);
const grade6 = Grade(8, 3);

const grade7 = Grade(6, 1)
const grade8 = Grade(1, 2);
const grade9 = Grade(10, 3);

export const GradeList1: Grade[] = [grade1, grade2, grade3];
export const GradeList2: Grade[] = [grade4, grade5, grade6];
export const GradeList3: Grade[] = [grade7, grade8, grade9];

export default GradeList1;
