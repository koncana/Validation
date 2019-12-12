import { Component, OnInit } from '@angular/core';
import { Student } from '../interfaces/student';
import { ValidationService } from '../services/validation.service';
import { GraphQLModule } from '../graphql/graphql.module';
import { ToastController } from '@ionic/angular';

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

  private oldDni: string;

  constructor(private api: ValidationService, private graphql: GraphQLModule, private toastController: ToastController) {
  }

  ngOnInit() {
    this.showStudent();
  }

  async showStudent() {
    this.student = Object.assign({}, this.api.Student);
    this.oldDni = this.student.dni;
  }

  async modifyStudent() {
    this.api.getStudent(this.student.dni).subscribe(result => {
      if (result.data.getStudent === null) {
        this.api.updateStudentAll(this.student).subscribe(result => {
          this.api.updateStudentFromUser(this.student.dni).subscribe(res => {
            this.api.getStudentFromUser();
            this.api.getStudent(this.student.dni).subscribe(aux => {
              this.student = aux.data.getStudent;
            });
          });
        });
      } else {
        if (result.data.getStudent.dni === this.api.Student.dni) {
          this.api.updateUserDeleteStudent().subscribe(data => {
            this.api.updateStudent(this.student).subscribe(result => {
              this.api.updateStudentFromUser(this.student.dni).subscribe(res => {
                this.api.removeStudent(this.oldDni).subscribe(() => {
                  
                });
                console.log(this.api.Student.dni);

                console.log(this.oldDni);

                this.api.getStudentFromUser();
                this.api.getStudent(this.student.dni).subscribe(aux => {
                  this.student = aux.data.getStudent;
                });
              });
            });
          });
        } else {
          this.presentToast("Student already exists");
        }
      }
    });
  }

  async presentToast(inputMessage: string) {
    const toast = await this.toastController.create({
      message: inputMessage,
      duration: 2000
    });
    toast.present();
  }
}
