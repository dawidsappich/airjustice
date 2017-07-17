import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSetComponent } from './form-set.component';

describe('FormSetComponent', () => {
  let component: FormSetComponent;
  let fixture: ComponentFixture<FormSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
