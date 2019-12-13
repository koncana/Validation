import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RenderFactoryService } from '../services/render-factory.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

  private darkOn: string = window.localStorage.getItem('0');
  private theme: string = "dark-theme";

  constructor(private router: Router, private renderFactory: RenderFactoryService) { }

  ngOnInit() {
  }

  darkMode() {
    if (this.darkOn) {
      window.localStorage.setItem('0',`${this.darkMode}`)
      this.renderFactory.darkMode(this.theme);
    } else {
      window.localStorage.setItem('0',`${this.darkMode}`)
      this.renderFactory.lightMode(this.theme);
    }
  }

  goBack() {
    this.router.navigate(['tabs/tab1']);
  }
}
