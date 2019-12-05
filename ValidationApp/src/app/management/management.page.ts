import { Component } from '@angular/core';
import { ValidateModule } from '../interfaces/validateModule';
import { Student } from '../interfaces/student';
import { User } from '../interfaces/users';
import { ValidationService } from '../services/validation.service';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { Modules } from '../interfaces/module';

@Component({
  selector: 'app-management',
  templateUrl: './management.page.html',
  styleUrls: ['./management.page.scss'],
})
export class ManagementPage {

  private validationPressed = false;
  private studentPressed = false;
  private userPressed = false;
  private validations: Array<Student>;
  private students: Array<Student>;
  private users: Array<User>;
  private student: Student;
  private user: User;
  private validation: ValidateModule;
  private dni: string;
  private username: string;
  private searchStudent: string;
  private studentSearched: boolean;
  private userSearched: boolean;
  private validationSearched: boolean;

  constructor(private api: ValidationService, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  getValidation() {
    this.api.getValidation(this.searchStudent).subscribe(result => {
      this.validation = result.data.getValidation
      this.validationSearched = true;
    });
  }

  enterStudent(student: Student) {
    let navigationExtra: NavigationExtras = {
      state: {
        student: student
      }
    }
    this.router.navigate(['student-information'], navigationExtra);
  }

  enterValidation(dni: string) {
    this.api.getAllContributeModulesByDNI(dni).subscribe(result => {
      this.api.getAllModulesToValidateByDni(dni).subscribe(res => {
        let contributeModules: Array<Modules> = result.data.getModulesFromStudent;
        let validateModules: Array<ValidateModule> = res.data.getAllModulesToValidate;
        let navigationExtra: NavigationExtras = {
          state: {
            contributeModules: contributeModules,
            validateModules: validateModules
          }
        }
        this.router.navigate(['validation-information'], navigationExtra);
      });
    });
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
      this.validations = result.data.getAllValidations;
    });
  }

  getUser() {
    this.api.getUser(this.username).subscribe(result => {
      this.user = result.data.getUser
      this.userSearched = true;
    });
  }

  getStudent() {
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
      this.users = result.data.getUsers;
    });
  }

  async modifyValidation(cod: number, dni: string) {
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
