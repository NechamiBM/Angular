import { Injectable } from '@angular/core';
import { Student } from "./Models/student.model";

const STUDENTS: Student[] = [new Student("Moshe", "Cohen", "Bney-Brak", "03-5701234", "true", 93),
new Student("Shimon", "Levi", "Jerusalem", "052-7685429", "false", 80),
new Student("Israel", "Israeli", "Elad", "03-6166161", "false", 99)];

@Injectable()
export class StusdentService {
    getStudents(): Student[] {
        return STUDENTS;
    }

    getStudentsSlowly(): Promise<Student[]> {
        return new Promise((res, rej) => {
            setTimeout(() => { res(STUDENTS); }, 5000);
        })
    }

    getAverageForId(id: number) {
        return STUDENTS.filter(x => x.id == id)[0].avgMarks;
    }

    getSumForId(id: number) {
        let student = STUDENTS.filter(x => x.id == id)[0];
        let sum = 0;
        for (const absent of student.abDays)
            sum += absent.totalDays;
        return sum;
    }


    constructor() {
        STUDENTS[0].id = 1;
        STUDENTS[1].id = 2;
        STUDENTS[2].id = 3;
        STUDENTS[0].quizes = [{ "id": 105, "date": new Date(), "description": "english", "mark": 80 },
        { "id": 105, "date": new Date(), "description": "math", "mark": 100 }]
    }
}