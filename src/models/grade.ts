// this file contains the model of the grade table

export interface Grade {
    grade: number
	courseId: number
}

export const Grade = (grade: number, courseId: number ): Grade => ({
	grade,
	courseId
});

export default Grade;
