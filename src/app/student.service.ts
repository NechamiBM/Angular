import { Injectable } from '@angular/core';
import { Student } from "./Models/student.model";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const STUDENTS: Student[] = [];

@Injectable()
export class StusdentService {

    getStudentsFromServer(): Observable<Student[]> {
        return this._http.get<Student[]>("/api/Students");
    }
    getStudentsFromServerByActive(active: boolean): Observable<Student[]> {
        return this._http.get<Student[]>("/api/Students/active=" + active)
    }
    saveNewStudent(student: Student): Observable<boolean> {
        student.isActive = Boolean(student.isActive);
        student.courseId = Number(student.courseId);
        return this._http.post<boolean>("api/Students", student)
    }
    updateStudent(student: Student): Observable<boolean> {
        return this._http.put<boolean>(`api/Students/${student.id}`, student);
    }
    deleteStudent(id: number): Observable<boolean> {
        return this._http.delete<boolean>("api/Students/" + id);
    }
    getStudentsFromServerByName(name: string): Observable<Student[]> {
        if (name == '')
            return this._http.get<Student[]>("/api/Students");
        return this._http.get<Student[]>("api/Students/name=" + name)
    }

    getStudents(): Student[] {
        return STUDENTS;
    }

    getStudentsSlowly(): Promise<Student[]> {
        return new Promise((res, _) => {
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

    constructor(private _http: HttpClient) {
    }
}