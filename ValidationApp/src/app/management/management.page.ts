import { Component, OnInit } from '@angular/core';
import { ValidateModule } from '../interfaces/validateModule';
import { Student } from '../interfaces/student';
import { User } from '../interfaces/users';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.page.html',
  styleUrls: ['./management.page.scss'],
})
export class ManagementPage {

  private validationPressed = false;
  private studentPressed = false;
  private userPressed = false;
  private validations: Array<ValidateModule>;
  private students: Array<Student>;
  private users: Array<User>;

  constructor(private api: ValidationService) { }

  ngOnInit() {
  }

  setTrueValidation(){
    this.api.getAllValidations().subscribe(result => {
      this.validations = result.data.getAllValidations;
    });
    this.validationPressed = true;
    this.studentPressed = false;
    this.userPressed = false;
  }

  setTrueStudent(){
    this.api.getAllStudents().subscribe(result => {
      this.students = result.data.getStudents;
    });
    this.validationPressed = false;
    this.studentPressed = true;
    this.userPressed = false;
  }

  setTrueUsers(){
    this.api.getAllUsers().subscribe(result => {
      this.users = result.data.getUsers;
    });
    this.validationPressed = false;
    this.studentPressed = false;
    this.userPressed = true;
  }

}
