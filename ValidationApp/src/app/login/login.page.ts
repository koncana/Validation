import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../services/validation.service'
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GraphQLModule } from '../graphql/graphql.module';
import { SqliteService } from '../services/sqlite.service';
// import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  private username: string;
  private password: string;
  private imageSrc: string;
  private base64Image: string = null;
  private images: Array<string>;

  constructor(private camera: Camera, private api: ValidationService, private router: Router, private graphql: GraphQLModule,
    private toastController: ToastController, private sqlite: SqliteService, private alertController: AlertController) { }

  ngOnInit() {
    this.database();
  }

  async arrayImages() {
    this.sqlite.getRows().then(() => {
      this.images = this.sqlite.Rows_data;
    });
    let image_options = [];
    for (let image of this.images) {
      image_options.push({
        type: 'img',
        label: '',
        value: image,
        checked: 0
      });
    }
    let alert = await this.alertController.create({
      header: 'Images',
      inputs: image_options,
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
            this.base64Image = data;
          }
        }
      ]
    });
    await alert.present();
  }

  takePicture() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.sqlite.insertRow(`data:image/jpeg;base64,${imageData}`);
    }, (err) => {
      // Handle error
    });
  }

  database() {
    this.sqlite.createDB();
    this.images = this.sqlite.Rows_data;
  }

  login() {
    this.graphql.Username = this.username;
    this.graphql.Password = this.password;
    this.graphql.setApollos();
    this.api.getCurrentUser().subscribe(result => {
      this.graphql.User = result.data.getUser;
      this.api.getStudentFromUser();
      this.password = "";
      this.username = "";
      if (this.graphql.User.role == "ROLE_ADMIN") {
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
