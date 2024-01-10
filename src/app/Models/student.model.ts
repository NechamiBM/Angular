import { AbsenceDays } from "./absence.model";
import { Quiz } from "./quiz.model";

export class Student {
    static counter: number = 0;
    public id: number | undefined;
    public fname: string;
    public lname: string;
    public address: string;
    public phone: string;
    public isActive: string;
    public avgMarks: number;
    public lastDay: Date;
    public courseId?: number;
    public year?: Year;
    public quizes: Quiz[];
    public abDays: AbsenceDays[] = [];

    constructor(fname?: string, lname?: string, address?: string, phone?: string, isActive?: string, avg?: number) {
        this.id = 0;
        this.fname = fname || "new";
        this.lname = lname || "student";
        this.address = address || "Israel";
        this.phone = phone || "03-5555555";
        this.isActive = isActive || "false";
        this.avgMarks = avg || 100;
        this.lastDay = new Date();
        this.quizes = [{ "id": 100, "date": new Date(), "description": "test 1", "mark": 80 }]
    }
}

export enum Year {
    First = 1,
    Second = 2,
    Third = 3
}