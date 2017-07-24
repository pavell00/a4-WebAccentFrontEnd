import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocNoDateComponent } from './doc-no-date.component';

describe('DocNoDateComponent', () => {
  let component: DocNoDateComponent;
  let fixture: ComponentFixture<DocNoDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocNoDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocNoDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
