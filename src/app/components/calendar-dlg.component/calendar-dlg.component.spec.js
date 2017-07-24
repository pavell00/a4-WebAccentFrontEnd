"use strict";
var testing_1 = require("@angular/core/testing");
var calendar_dlg_component_1 = require("./calendar-dlg.component");
describe('CalendarDlgComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [calendar_dlg_component_1.CalendarDlgComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(calendar_dlg_component_1.CalendarDlgComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=calendar-dlg.component.spec.js.map