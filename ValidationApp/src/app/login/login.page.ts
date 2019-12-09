import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../services/validation.service'
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GraphQLModule } from '../graphql/graphql.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private username: string;
  private password: string;

  constructor(private api: ValidationService, private router: Router, private graphql: GraphQLModule, private toastController: ToastController) { }

  ngOnInit() {
  }

  login() {
    this.graphql.Username = this.username;
    this.graphql.Password = this.password;
    this.graphql.setApollos();
    this.api.getCurrentUser().subscribe(result => {
      this.graphql.user = result.data.getUser;
      this.api.getStudentFromUser();
      this.password = "";
      this.username = "";
      if (this.graphql.user.role == "ROLE_ADMIN") {
        this.router.navigate(['tabs/tab4'])
      } else {
        this.router.navigate(['tabs/tab1']);
      }
    }, error => {
      this.presentToast("Wrong username or password");
    });
  }

  async register() {
    this.graphql.setApollosEmpty();
    this.router.navigate(['register']);
  }

  async presentToast(inputMessage: string) {
    const toast = await this.toastController.create({
      message: inputMessage,
      duration: 2000
    });
    toast.present();
  }
}
