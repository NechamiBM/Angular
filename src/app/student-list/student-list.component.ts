import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Student } from '../Models/student.model';
import { StusdentService } from 'src/app/student.service';

@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  selectedStudent: Student | undefined;

  @Output()
  focusStudent: EventEmitter<Student> = new EventEmitter();

  onFocusStudent(s: Student) {
    this.selectedStudent = s;
    this.focusStudent.emit(this.selectedStudent);
  }

  addNewStudent() {
    this.selectedStudent = new Student();
  }


  saveToList(studentToSave: Student) {
    if (studentToSave.id == 0) {
      studentToSave.id = this.students.length + 1;
      this.students.push(studentToSave);
    }
    else {
      let taskToUpdate = this.students.filter(x => x.id == studentToSave.id)[0];
      let index = this.students.indexOf(taskToUpdate);
      this.students[index] = studentToSave;
    }
    alert("added succesfully  " + JSON.stringify(this.selectedStudent));
    this.selectedStudent = undefined;
  }

  deleteStudent(s: Student) {
    this.students.splice(this.students.indexOf(s), 1);
  }

  showStudent(s: Student) {
    this.selectedStudent = s;
  }

  total(student:Student): number {
    if (student.id)
      return this._studentService.getSumForId(student.id);
    return 0;
  }
  constructor(private _studentService: StusdentService) { }

  /*async*/ ngOnInit(): void {
    // var s = await this._studentService.getStudentsSlowly();
    // this.students = s;
    this._studentService.getStudentsSlowly().then(studentList => {
      this.students = studentList;
    });
  }

}