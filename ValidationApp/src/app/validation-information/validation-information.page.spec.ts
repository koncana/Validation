import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValidationInformationPage } from './validation-information.page';

describe('ValidationInformationPage', () => {
  let component: ValidationInformationPage;
  let fixture: ComponentFixture<ValidationInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationInformationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidationInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
