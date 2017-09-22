import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialog2Component } from './edit-dialog2.component';

describe('EditDialog2Component', () => {
  let component: EditDialog2Component;
  let fixture: ComponentFixture<EditDialog2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDialog2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialog2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
