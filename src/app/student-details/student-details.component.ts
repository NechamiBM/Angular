import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from '../Models/student.model';

@Component({
  selector: 'student-details',
  templateUrl: './student-details.component.html'
})
export class StudentDetailsComponent implements OnInit {

  @Output() onSavingStudent: EventEmitter<Student> = new EventEmitter;

  @Input() student: Student | undefined;

  saveNewStudent(){
    this.onSavingStudent.emit(this.student);
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
