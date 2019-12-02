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

  ngOnInit(){
    this.showStudent();
  }

  async showStudent(){ 
    
    //await this.api.getStudentFromUser();
    this.student = this.api.student;    
  }

  set Student(student: Student){
    this.student = student;
  }
}
