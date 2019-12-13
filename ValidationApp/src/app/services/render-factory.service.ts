import { Injectable, RendererFactory2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RenderFactoryService {

  private render: any;

  constructor(@Inject(DOCUMENT) private document, private renderFactory: RendererFactory2) { 
    this.render = this.renderFactory.createRenderer(null, null);
  }

  darkMode(bodyClass: any){
    this.render.addClass(this.document.body, bodyClass);
  }

  lightMode(bodyClass: any){
    this.render.removeClass(this.document.body, bodyClass);
  }
}
