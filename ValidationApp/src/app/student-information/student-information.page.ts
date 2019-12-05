import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../interfaces/student';

@Component({
  selector: 'app-student-information',
  templateUrl: './student-information.page.html',
  styleUrls: ['./student-information.page.scss'],
})
export class StudentInformationPage {

  private student: Student = {
    dni: "",
    studentName: "",
    firstSurname: "",
    secondSurname: "",
    dateOfBirth: "",
    telephone: "",
    cycle: "",
    group: "",
    shift: "",
    course: ""
  }

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadStudent();
  }

  loadStudent() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.student = this.router.getCurrentNavigation().extras.state.student;
    }
  }

  goBack() {
    this.router.navigate(['tabs/tab4']);
  }

}
