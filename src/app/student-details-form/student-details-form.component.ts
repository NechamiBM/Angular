import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student, Year } from '../Models/student.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APP_COURSE, Course } from '../Models/course.model';
import { StusdentService } from '../student.service';

@Component({
  selector: 'student-details-form',
  templateUrl: './student-details-form.component.html',
  styleUrls: ['./student-details-form.component.css']
})
export class StudentDetailsFormComponent implements OnInit {

  private _student: Student | undefined;
  coursesList: Course[] = APP_COURSE;
  studyYear = Year;

  public get student(): Student | undefined {
    return this._student;
  }
  
  @Input()
  public set student(value: Student | undefined) {
    this._student = value;
    if (this.student != undefined) {
      this.studentForm = new FormGroup({
        "id": new FormControl(this.student.id),
        "fname": new FormControl(this.student.fname, [Validators.required, Validators.minLength(2)]),
        "lname": new FormControl(this.student.lname, [Validators.required, Validators.minLength(2)]),
        "address": new FormControl(this.student.address, Validators.required),
        "phone": new FormControl(this.student.phone, Validators.required),
        "isActive": new FormControl(this.student.isActive),
        "avgMarks": new FormControl(this.student.avgMarks, [Validators.max(100), Validators.min(1), Validators.required]),
        "lastDay": new FormControl(this.student.lastDay),
        "courseId": new FormControl(this.student.courseId, Validators.required),
        "year": new FormControl(this.student.year, Validators.required),
      });
    }
  }

  @Output()
  onSavingStudent: EventEmitter<Student> = new EventEmitter();

  studentForm: FormGroup = new FormGroup({});

  missingFromDate: Date | undefined;
  missingDays?: number;

  totalMissingDays: number = 0;

  saveNewStudent() {
    this.student = this.studentForm.value;
    if (this.student)
      this.student.year = +this.studentForm.controls['year'].value;
    if (this.missingDays && this.missingDays > 0 && this.missingFromDate)
      this.student?.abDays.push({
        fromDate: this.missingFromDate,
        totalDays: this.missingDays
      });
    this.onSavingStudent.emit(this.student);
  }

  total(): number {
    if (this.student?.id)
      return this._studentService.getSumForId(this.student.id);
    return 0;
  }

  constructor(private _studentService: StusdentService) { }

  ngOnInit(): void {

  }

}