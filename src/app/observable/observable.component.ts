import { Component, OnInit } from '@angular/core';
import { Observable, from, interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Student } from '../Models/student.model';
import { StusdentService } from '../student.service';

@Component({
  selector: 'observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {

  students: Student[] = [];
  students2: Observable<string> | undefined;

  source: Observable<Student> = new Observable((observer) => {
    for (const student of this.students) {
      observer.next(student);
    }
  });

  mails: Observable<Student> = new Observable((observer) => {
    for (const student of this.students) {
      observer.next(student);
    }
  });

  timer: Observable<string> = new Observable(obs => {
    setInterval(() => {
      obs.next(new Date().toLocaleTimeString());
    }, 1000)
  });

  timerstring: string = "";

  timer2: Observable<string> = interval(1000).pipe(map(() => new Date().toLocaleTimeString()));
  timerstring2: string = "";

  stu: string = "";
  mail() {
    this.mails.subscribe((student) => {
      // ...שליחת המייל איכשהוא
      if (student.isActive == "true")
        this.stu += "mail sended successfully to " + student.phone + "<br>";
    })
  }

  stu2: string = "";
  mail2() {
    const emailObservable = from(this.students).pipe(
      filter(student => student.isActive == "true"), // סינון לסטודנטים פעילים בלבד
      map(student => "mail sended successfully " + student.phone + "<br>") // שליחת המייל והחזרת הודעת הצלחה
    );
    emailObservable.subscribe((email) => {
      this.stu2 += email;
    });
  }

  constructor(private _studentService: StusdentService) {
    this.students = this._studentService.getStudents();
    this.source.subscribe((val) => {
      console.log("student", val);
    })
    this.students2 = from(this.students).pipe(
      map(student => student.fname + " " + student.lname)
    );
    this.students2.subscribe((name) => {
      console.log("name", name);
    });
    this.timer.subscribe((d) => {
      this.timerstring = d;
    });
    this.timer2.subscribe((d) => {
      this.timerstring2 = d;
    });
  }

  ngOnInit(): void {
  }

}