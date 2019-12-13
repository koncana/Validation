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
  private modulesPressed = false;
  private validations: Array<Student>;
  private students: Array<Student>;
  private users: Array<User>;
  private modules: Array<Modules>;
  private student: Student;
  private user: User;
  private validation: ValidateModule;
  private module: Modules;
  private dni: string;
  private username: string;
  private cod: number;
  private searchStudent: string;
  private studentSearched: boolean;
  private userSearched: boolean;
  private validationSearched: boolean;
  private moduleSearched: boolean;
  private addCod: number;
  private moduleName: string;

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
    this.modulesPressed = false;
  }

  setTrueStudent() {
    this.getStudents();
    this.validationPressed = false;
    this.studentPressed = true;
    this.userPressed = false;
    this.modulesPressed = false;
  }

  setTrueUsers() {
    this.getUsers();
    this.validationPressed = false;
    this.studentPressed = false;
    this.userPressed = true;
    this.modulesPressed = false;
  }

  setTrueModules() {
    this.getModules();
    this.validationPressed = false;
    this.studentPressed = false;
    this.userPressed = false;
    this.modulesPressed = true;
  }

  getModule() {
    this.api.getModule(this.cod).subscribe(result => {
      this.module = result.data.getModule;
      this.moduleSearched = true;
    });
  }

  addModule() {
    this.api.addModule(this.addCod, this.moduleName).subscribe(result => {
      this.getModules();
    });
  }

  getModules() {
    this.api.getAllModules().subscribe(result => {
      this.modules = result.data.getAllModules;
    });
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

  deleteAModule(cod: number) {
    this.moduleSearched = false;
    this.deleteModule(cod);
  }

  deleteModule(cod: number) {
    this.api.deleteModule(cod).subscribe(result => {
      this.getModules();
    });
  }

  async modifyModule(cod: number) {
    const alert = await this.alertController.create({
      header: 'New name',
      inputs: [
        {
          name: 'moduleName',
          type: 'text',
          placeholder: 'Name'
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
            this.api.updateModule(cod, data.moduleName).subscribe(result => {
              this.getModules();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async modifyUser(username: string) {
    let radio_options = [];
    radio_options.push(
      {
        type: 'radio',
        label: "User",
        value: "user",
        checked: 0
      },
      {
        type: 'radio',
        label: "Admin",
        value: "admin",
        checked: 0
      },
      {
        type: 'radio',
        label: "Blocked",
        value: "blocked",
        checked: 0
      }
    );

    let alert = await this.alertController.create({
      header: 'Roles',
      inputs: radio_options,
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
            this.api.getStudentFromUserByUsername(username).subscribe(result => {
              this.api.updateRole(username, data).subscribe(aux => {
                this.api.createStudent(result.data.getStudentFromUser).subscribe(res => {
                  this.api.updateStudentFromUserByUsername(res.data.createStudent.dni, username).subscribe(end => {
                    this.getUsers();
                  });
                });
              });
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
