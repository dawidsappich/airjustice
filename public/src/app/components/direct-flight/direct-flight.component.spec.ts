import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectFlightComponent } from './direct-flight.component';

describe('DirectFlightComponent', () => {
  let component: DirectFlightComponent;
  let fixture: ComponentFixture<DirectFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
