import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStatisticComponent } from './login-statistic.component';

describe('LoginStatisticComponent', () => {
  let component: LoginStatisticComponent;
  let fixture: ComponentFixture<LoginStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
