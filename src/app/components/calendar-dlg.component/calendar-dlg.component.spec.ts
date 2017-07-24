import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDlgComponent } from './calendar-dlg.component';

describe('CalendarDlgComponent', () => {
  let component: CalendarDlgComponent;
  let fixture: ComponentFixture<CalendarDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
