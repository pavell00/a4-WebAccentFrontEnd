import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinderSelectorComponent } from './binder-selector.component';

describe('BinderSelectorComponent', () => {
  let component: BinderSelectorComponent;
  let fixture: ComponentFixture<BinderSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinderSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinderSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
