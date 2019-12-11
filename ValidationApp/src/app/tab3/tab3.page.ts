import { Component } from '@angular/core';
import { ValidationService } from '../services/validation.service'
import { Router } from '@angular/router';
import { GraphQLModule } from '../graphql/graphql.module';
import { User } from '../interfaces/users';

import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  private user: User = {
    username: "",
    password: "",
    role: ""
  };

  constructor(private api: ValidationService, private router: Router, private graphql: GraphQLModule, private alertController: AlertController, private toastController: ToastController) { }

  ngOnInit() {
    this.loadUser();
  }

  async updateUsername() {
    let alert = await this.alertController.create({
      header: 'New Username',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'Username'
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
            this.api.updateUsername(data.username).subscribe(result => {
              this.graphql.setApollosEmpty();
              this.api.createStudent(this.api.Student).subscribe(res => {
                this.api.updateStudentFromUserByUsername(this.api.Student.dni, data.username).subscribe(aux => {
                  this.router.navigate(['login']);
                });
              });
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async loadUser() {
    this.api.getCurrentUser().subscribe(result => {
      this.graphql.User = result.data.getUser;
      this.user = result.data.getUser;
    });
  }

  async logout() {
    this.router.navigate(['login']);
  }

  async updatePassword() {
    let alert = await this.alertController.create({
      header: 'New Password',
      inputs: [
        {
          name: 'oldPassword',
          type: 'password',
          placeholder: 'Old Password'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        },
        {
          name: 'confirmPassword',
          type: 'password',
          placeholder: 'Confirm Password'
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
            if (data.password === data.confirmPassword) {
              this.api.updatePassword(data.password).subscribe(result => {
                this.graphql.Password = data.password;
                this.graphql.setApollos();
              });
            } else {
              this.presentToast("Password do not match");
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async delete() {
    this.api.removeCurrentUser().subscribe(result => {
      this.router.navigate(['login']);
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
