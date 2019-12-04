import { Component } from '@angular/core';
import { ValidationService } from '../services/validation.service'
import { Router } from '@angular/router';
import { GraphQLModule } from '../graphql/graphql.module';
import { User } from '../interfaces/users';

import { AlertController } from '@ionic/angular';

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

  constructor(private api: ValidationService, private router: Router, private graphql: GraphQLModule, private alertController: AlertController) { }

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
            this.api.updateUser(data.username).subscribe(result => {
              this.graphql.Username = data.username;
              this.graphql.setApollos();
              this.logout();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async loadUser() {
    this.api.getCurrentUser().subscribe(result => {
      this.graphql.user = result.data.getUser;
      this.user = result.data.getUser;
    });
  }

  async logout() {
    this.router.navigate(['login']);
  }
}
