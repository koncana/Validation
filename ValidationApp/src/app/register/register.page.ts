import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from '../interfaces/users';

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

  constructor(private formBuilder: FormBuilder, private router: Router, private toastController: ToastController) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.checkPasswords });
  }

  ngOnInit() {
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  register() {
    if (this.userForm.value['password'] !== this.userForm.value['confirmPassword']) {
      this.presentToast("Password do not match");
    } else {
      console.log(this.userForm.value['username']);
      
      this.user.username = this.userForm.value['username'];
      this.user.password = this.userForm.value['password'];
      let navigationExtra: NavigationExtras = {
        state: {
          user: this.user
        }
      }
      this.router.navigate(['student-register'], navigationExtra)
    }
  }

  async presentToast(inputMessage: string) {
    const toast = await this.toastController.create({
      message: inputMessage,
      duration: 2000
    });
    toast.present();
  }
}
