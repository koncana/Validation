import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../services/validation.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/users';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.page.html',
  styleUrls: ['./student-register.page.scss'],
})
export class StudentRegisterPage {

  private user: User;
  private studentForm: any;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.studentForm = this.formBuilder.group({
      dni: ['', Validators.required],
      studentName: ['', [Validators.required]],
      firstSurname: ['', [Validators.required]],
      secondSurname: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      cycle: ['', [Validators.required]],
      group: ['', [Validators.required]],
      shift: ['', [Validators.required]],
      course: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  async loadData() {
    if (this.router.getCurrentNavigation().extras.state) {
      console.log("bbbbbb");

      console.log(this.router.getCurrentNavigation().extras.state.user);

      this.user = this.router.getCurrentNavigation().extras.state.user;
      console.log(this.router.getCurrentNavigation().extras.state.user);
    }
  }

  register() {

  }

}
