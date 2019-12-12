import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { User } from '../interfaces/users';
import { ValidationService } from '../services/validation.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  private userForm: FormGroup;
  private user: User = {
    username: "",
    password: "",
    role: ""
  };

  constructor(private formBuilder: FormBuilder, private router: Router, private api: ValidationService, private toastController: ToastController) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  register() {
    this.api.getUser(this.userForm.value['username']).subscribe(result => {
      if (result.data.getUser === null) {
        this.user.username = this.userForm.value['username'];
        this.user.password = this.userForm.value['password'];
        let navigationExtra: NavigationExtras = {
          state: {
            user: this.user
          }
        }
        this.router.navigate(['student-register'], navigationExtra);
      } else {
        this.presentToast("User already exists");
      }
    });
  }

  goBack() {
    this.user.username = "",
      this.user.password = "",
      this.router.navigate(['login']);
  }

  async presentToast(inputMessage: string) {
    const toast = await this.toastController.create({
      message: inputMessage,
      duration: 2000
    });
    toast.present();
  }
}
