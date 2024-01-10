import { Component } from "@angular/core";
import { Student } from "./Models/student.model";

@Component({
    templateUrl: "./app.component.html",
    selector: "app-root"
})

export class AppComponent {
    title: string = "My - First - App";

    student: Student | undefined;

    showQuizes(st: Student) {
        this.student = st;
    }

    timeOfDay() {
        const currentTime = new Date();
        const hour = currentTime.getHours();
        if (hour >= 6 && hour < 12)
            return 'Good Morning';
        else if (hour >= 12 && hour < 18)
            return 'Good Noon';
        return 'Good Evening';
    }

    constructor() {

    }

}