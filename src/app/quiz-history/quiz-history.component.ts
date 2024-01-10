import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from '../Models/quiz.model';
import { StusdentService } from '../student.service';

@Component({
  selector: 'quiz-history',
  templateUrl: './quiz-history.component.html',
  styleUrls: ['./quiz-history.component.css']
})
export class QuizHistoryComponent implements OnInit {

  @Input() quizes: Quiz[] | undefined;
  @Input() id: number | undefined;
  avg(): number {
    if (this.id != undefined)
      return this._studentService.getAverageForId(this.id);
    return 0;
  }

  constructor(private _studentService: StusdentService) { }

  ngOnInit(): void {
  }
}
