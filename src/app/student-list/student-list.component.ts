import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Student } from '../Models/student.model';
import { StusdentService } from 'src/app/student.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html'
})

export class StudentListComponent implements OnInit {

  students: Student[] = [];
  count: number = 0;
  selectedStudent: Student | undefined;
  searchInput: Subject<string> = new Subject<string>();
  studentName: string = '';

  @Output()
  focusStudent: EventEmitter<Student> = new EventEmitter();

  showStudentByActive(active: boolean) {
    this._studentService.getStudentsFromServerByActive(active).subscribe(data => this.students = data)
  }

  onFocusStudent(s: Student) {
    this.selectedStudent = s;
    this.focusStudent.emit(this.selectedStudent);
  }

  addNewStudent() {
    this.selectedStudent = new Student();
  }

  saveToList(studentToSave: Student) {
    console.log("studentToSave", studentToSave);
    // let dd=new Student(){ id: studentToSave.id, fname: studentToSave.fname, lname: studentToSave.lname, address: studentToSave.address, phone: studentToSave.phone, isActive: studentToSave.isActive, avgMarks: studentToSave.avgMarks, lastDay: studentToSave.lastDay, courseId: studentToSave.courseId, year: studentToSave.year }
    if (studentToSave.id != 0)
      this._studentService.updateStudent(studentToSave).subscribe((data) => {
        console.log("update", data);
        this.students[this.students?.findIndex(s => studentToSave.id == s.id)] = studentToSave;
      }, err => console.log("err", err));
    else {
      studentToSave.id = ++this.count;
      this._studentService.saveNewStudent(studentToSave).subscribe(() => {
        alert("add success!");
        this.students.push(studentToSave);
      }, err => console.log("err", err));
    }
    this.selectedStudent = undefined;
  }

  deleteStudent(studentToDelete: number) {
    this._studentService.deleteStudent(studentToDelete).subscribe(() => {
      this.students = this.students.filter(s => s.id != studentToDelete);
    }, err => console.log("err", err))
  }

  showStudent(s: Student) {
    this.selectedStudent = s;
  }

  total(student: Student): number {
    if (student.id)
      return this._studentService.getSumForId(student.id);
    return 0;
  }

  constructor(private _studentService: StusdentService) { }

  ngOnInit(): void {
    //this.students = this._studentService.getStudents();
    this._studentService.getStudentsFromServer().subscribe(data => {
      this.students = data;
      this.count = Math.max(...this.students.map(student => student.id)); this.students.length;
    });
    this.filterStudents();
  }

  filterStudents(): void {
    this.searchInput.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(() => this._studentService.getStudentsFromServerByName(this.studentName)),
    ).subscribe(d => this.students = d);
  }

  getStudentByName() {
    this.searchInput.next(this.studentName);
  }

}