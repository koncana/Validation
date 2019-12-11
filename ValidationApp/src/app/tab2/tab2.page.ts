import { Component, OnInit } from '@angular/core';
import { Student } from '../interfaces/student';
import { ValidationService } from '../services/validation.service';
import { GraphQLModule } from '../graphql/graphql.module';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

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

  constructor(private api: ValidationService, private graphql: GraphQLModule) {
  }

  ngOnInit() {
    this.showStudent();
  }

  async showStudent() {
    this.student = Object.assign({}, this.api.Student);
  }

  set Student(student: Student) {
    this.student = student;
  }

  async modifyStudent() {
    this.api.updateUserDeleteStudent().subscribe(data => {
      if (this.student.dni === this.api.Student.dni) {
        this.api.updateStudent(this.student).subscribe(result => {
          this.api.updateStudentFromUser(this.student.dni).subscribe(res => {
            this.api.getStudentFromUser();
            this.api.getStudent(this.student.dni).subscribe(aux => {
              this.student = aux.data.getStudent;
            });
          });
        });

      } else {
        this.api.updateStudentAll(this.student).subscribe(result => {
          this.api.updateStudentFromUser(this.student.dni).subscribe(res => {
            this.api.getStudentFromUser();
            this.api.getStudent(this.student.dni).subscribe(aux => {
              this.student = aux.data.getStudent;
            });
          });
        });
      }
    });
  }
}
