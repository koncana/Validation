import { Component, OnInit } from '@angular/core';
import { Student } from '../interfaces/student';
import { ValidationService } from '../services/validation.service';
import { GraphQLModule } from '../graphql/graphql.module';
import { ToastController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  private studentForm: any;
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

  constructor(private api: ValidationService, private graphql: GraphQLModule, private toastController: ToastController, private formBuilder: FormBuilder) {
    this.studentForm = this.formBuilder.group({
      dni: ['', Validators.compose([Validators.pattern('\\d{8}[A-Z]{1}'), Validators.required])],
      studentName: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required])],
      firstSurname: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required])],
      secondSurname: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required])],
      dateOfBirth: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('\\d{4}-[0-1]\\d-[0-3]\\d'), Validators.required])],
      telephone: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('([+]\\d{2})?\\d{9}'), Validators.required])],
      cycle: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-Z]+'), Validators.required])],
      group: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-Z]+'), Validators.required])],
      shift: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-Z]+'), Validators.required])],
      course: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('\\d{4}-\\d{4}'), Validators.required])]
    });
  }

  ngOnInit() {
    this.showStudent();
  }

  async showStudent() {
    this.student = Object.assign({}, this.api.Student);
    this.oldDni = this.student.dni;
    this.studentForm.controls['dni'].setValue(this.student.dni);
    this.studentForm.controls['studentName'].setValue(this.student.studentName);
    this.studentForm.controls['firstSurname'].setValue(this.student.secondSurname);
    this.studentForm.controls['secondSurname'].setValue(this.student.secondSurname);
    this.studentForm.controls['dateOfBirth'].setValue(this.student.dateOfBirth.substring(0, 10));
    this.studentForm.controls['telephone'].setValue(this.student.telephone);
    this.studentForm.controls['cycle'].setValue(this.student.cycle);
    this.studentForm.controls['group'].setValue(this.student.group);
    this.studentForm.controls['shift'].setValue(this.student.shift);
    this.studentForm.controls['course'].setValue(this.student.course);
  }

  async modifyStudent() {
    this.student.dni = this.studentForm.value['dni'];
    this.student.studentName = this.studentForm.value['studentName'];
    this.student.firstSurname = this.studentForm.value['firstSurname'];
    this.student.secondSurname = this.studentForm.value['secondSurname'];
    this.student.dateOfBirth = this.studentForm.value['dateOfBirth'];
    this.student.telephone = this.studentForm.value['telephone'];
    this.student.cycle = this.studentForm.value['cycle'];
    this.student.group = this.studentForm.value['group'];
    this.student.shift = this.studentForm.value['shift'];
    this.student.course = this.studentForm.value['course'];
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
                  this.api.getStudentFromUser();
                  this.api.getStudent(this.student.dni).subscribe(aux => {
                    this.student = aux.data.getStudent;
                  });
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
