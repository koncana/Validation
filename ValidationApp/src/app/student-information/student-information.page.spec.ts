import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentInformationPage } from './student-information.page';

describe('StudentInformationPage', () => {
  let component: StudentInformationPage;
  let fixture: ComponentFixture<StudentInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentInformationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
