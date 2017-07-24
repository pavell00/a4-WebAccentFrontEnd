"use strict";
var testing_1 = require("@angular/core/testing");
var type_selector_component_1 = require("./type-selector.component");
describe('TypeSelectorComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [type_selector_component_1.TypeSelectorComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(type_selector_component_1.TypeSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=type-selector.component.spec.js.map