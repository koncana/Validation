import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManagementPage } from './management.page';

describe('ManagementPage', () => {
  let component: ManagementPage;
  let fixture: ComponentFixture<ManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
