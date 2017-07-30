import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoclaimComponent } from './noclaim.component';

describe('NoclaimComponent', () => {
  let component: NoclaimComponent;
  let fixture: ComponentFixture<NoclaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoclaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
