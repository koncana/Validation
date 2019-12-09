import { Component } from '@angular/core';
import { Student } from '../interfaces/student';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

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

  constructor(private api: ValidationService) {
  }

  ngOnInit() {
    console.log("2"+this.api.Student.dni);
    
    this.showStudent();
  }

  async showStudent() {
    console.log("1"+this.api.Student.dni);
    
    this.student = this.api.Student;
  }

  set Student(student: Student) {
    console.log("3"+this.api.Student.dni);
    this.student = student;
  }

  modifyStudent() {
    console.log(this.api.Student.dni);
    if (this.student.dni === this.api.Student.dni) {
      console.log(this.student.dni+"aqui"+this.api.Student.dni);
      
      this.api.updateUserDeleteStudent().subscribe(data => {
        this.api.updateStudent(this.student).subscribe(result => {
          this.api.updateStudentFromUser(this.student.dni).subscribe(res => {
            this.api.getStudentFromUser();
            this.showStudent();
          });
        });
      });
    } else {
      this.api.updateUserDeleteStudent().subscribe(data => {
        this.api.updateStudentAll(this.student).subscribe(result => {
          this.api.updateStudentFromUser(this.student.dni).subscribe(res => {
            this.api.getStudentFromUser();
            this.showStudent();
          });
        });
      });
    }
    // this.api.updateUserDeleteStudent().subscribe(data => {
    //   this.api.createStudent(this.student).subscribe(result => {
    //     this.api.updateStudentFromUser(this.student.dni).subscribe(res => {
    //       this.api.getStudentFromUser();
    //       this.showStudent();
    //     });
    //   });
    // });


  }
}
