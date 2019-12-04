import { Component } from '@angular/core';
import { ValidateModule } from '../interfaces/validateModule';
import { Student } from '../interfaces/student';
import { User } from '../interfaces/users';
import { ValidationService } from '../services/validation.service';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './management.page.html',
  styleUrls: ['./management.page.scss'],
})
export class ManagementPage {

  private validationPressed = false;
  private studentPressed = false;
  private userPressed = false;
  private validations: Array<ValidateModule> = [];
  private students: Array<Student>;
  private users: Array<User>;
  private student: Student;  
  private user: User;
  private dni: string;
  private username: string;
  private studentSearched: boolean;
  private userSearched: boolean;

  constructor(private api: ValidationService, private alertController: AlertController,  private router: Router) { }

  ngOnInit() {
  }
  
  enterStudent(student: Student){    
    let navigationExtra : NavigationExtras = {
      state: {
        student: student
      }
    }

    this.router.navigate(['student-information'], navigationExtra);
  }

  enterValidation(){
    this.router.navigate(['validation-information']);
  }

  setTrueValidation() {
    this.getValidations();
    this.validationPressed = true;
    this.studentPressed = false;
    this.userPressed = false;
  }

  setTrueStudent() {
    this.getStudents();
    this.validationPressed = false;
    this.studentPressed = true;
    this.userPressed = false;
  }

  setTrueUsers() {
    this.getUsers();
    this.validationPressed = false;
    this.studentPressed = false;
    this.userPressed = true;
  }

  getValidations() {
    this.api.getAllValidations().subscribe(result => {
      // let auxValidations: Array<ValidateModule> = [];
      // let i;
      // for(let aux of result.data.getAllValidations){
      //   if(!auxValidations.includes(aux.student)){
      //     auxValidations[i] = aux;
      //     i++;
      //   }
      // }
      // console.log(auxValidations);

      // this.validations = result.data.getAllValidations.student;
      // this.validations = this.validations.filter((elem, index, self) => self.findIndex(
      //   (t) => {return (t.dni === elem.dni)}) === index);
      
      this.validations = result.data.getAllValidations;
    });
  }

  getUser(){
    this.api.getUser(this.username).subscribe(result => {
      this.user = result.data.getUser
      this.userSearched = true;
    });
  }

  getStudent(){
    this.api.getStudent(this.dni).subscribe(result => {
      this.student = result.data.getStudent;
      this.studentSearched = true;
    });
  }

  getStudents() {
    this.api.getAllStudents().subscribe(result => {
      this.students = result.data.getStudents;
    });
  }

  getUsers() {
    this.api.getAllUsers().subscribe(result => {
      // this.users = new Array<User>();
      this.users = result.data.getUsers;
    });
  }

  async modifyValidation(cod: number, dni: string){
    const alert = await this.alertController.create({
      header: 'Write the new status',
      inputs: [
        {
          name: 'status',
          type: 'text',
          placeholder: 'Status'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: data => {
            this.api.modifyValidation(cod, dni, data.status).subscribe(result => {

              this.getValidations();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  deleteStudent(dni: string) {
    this.api.removeStudent(dni).subscribe(result => {
      this.getStudents();
    });
  }

  deleteUser(username: string) {
    this.api.removeUser(username).subscribe(result => {
      this.getUsers();
    });
  }

}
