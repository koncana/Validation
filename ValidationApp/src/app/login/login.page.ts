import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../services/validation.service'
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GraphQLModule } from '../graphql/graphql.module';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private username: string;
  private password: string;
  private imageSrc: string;
  private base64Image: string = null;

  constructor(private options: CameraOptions, private camera: Camera, private storage: Storage, private api: ValidationService, private router: Router, private graphql: GraphQLModule, private toastController: ToastController) { }

  ngOnInit() {
  }

  getPicture(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
      // Handle error
    }); 
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
