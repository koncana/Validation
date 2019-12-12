import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-images',
  templateUrl: './images.page.html',
  styleUrls: ['./images.page.scss'],
})
export class ImagesPage implements OnInit {

  private images: any = [];

  constructor(private sqlite: SqliteService, private camera: Camera, private router: Router) { }

  ngOnInit() {
    this.arrayImages();
  }

  async takePicture() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    };

    await this.camera.getPicture(options).then((imageData) => {
      this.sqlite.insertRow(`data:image/jpeg;base64,${imageData}`);
      this.arrayImages();
    }, (err) => {
    });
  }

  async arrayImages() {
    await this.sqlite.getRows().then(() => {
      this.images = this.sqlite.Rows_data;
    });
  }

  async deleteImage(image) {
    this.sqlite.deleteRow(image).then(() => {
      this.arrayImages();
    });
  }

  goBack() {
    this.router.navigate(['tabs/tab3']);
  }
}
