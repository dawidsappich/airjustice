import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightTimingComponent } from './flight-timing.component';

describe('FlightTimingComponent', () => {
  let component: FlightTimingComponent;
  let fixture: ComponentFixture<FlightTimingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightTimingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
