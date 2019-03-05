import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficStatisticComponent } from './traffic-statistic.component';

describe('TrafficStatisticComponent', () => {
  let component: TrafficStatisticComponent;
  let fixture: ComponentFixture<TrafficStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
