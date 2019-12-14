import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../services/validation.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/users';
import { Student } from '../interfaces/student';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.page.html',
  styleUrls: ['./student-register.page.scss'],
})
export class StudentRegisterPage implements OnInit{

  private user: User = {
    username: "",
    password: "",
    role: "",
  };
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

  constructor(private router: Router, private formBuilder: FormBuilder, private api: ValidationService, private toastController: ToastController) {
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
    this.loadData();
  }

  async loadData() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.user = this.router.getCurrentNavigation().extras.state.user;
    }
  }

  goBack() {
    this.student.dni = "";
    this.student.studentName = "";
    this.student.firstSurname = "";
    this.student.secondSurname = "";
    this.student.dateOfBirth = "";
    this.student.telephone = "";
    this.student.cycle = "";
    this.student.group = "";
    this.student.shift = "";
    this.student.course = "";
    this.router.navigate(['register']);
  }

  register() {
    this.api.getStudent(this.studentForm.value['dni']).subscribe(result => {
      if (result.data.getStudent === null) {
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

        this.api.createStudent(this.student).subscribe(result => {
          this.api.createUser(this.user.username, this.user.password, this.student.dni).subscribe(result => {
            this.router.navigate(['login']);
          });
        });
      } else {
        this.presentToast("Student already exists");
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
