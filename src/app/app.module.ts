import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from './app.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { StudentDetailsFormComponent } from './student-details-form/student-details-form.component';
import { QuizHistoryComponent } from './quiz-history/quiz-history.component';
import { StusdentService } from "./student.service";
import { ObservableComponent } from './observable/observable.component';

@NgModule({
    declarations: [AppComponent,StudentDetailsComponent ,StudentListComponent, StudentDetailsFormComponent, QuizHistoryComponent, ObservableComponent ],
    imports: [BrowserModule, FormsModule, ReactiveFormsModule],
    providers:[StusdentService ],
    bootstrap: [AppComponent]
})
export class AppModule {

}