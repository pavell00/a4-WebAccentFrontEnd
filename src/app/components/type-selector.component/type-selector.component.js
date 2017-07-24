"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var app_service_1 = require("../../services/app.service");
var TypeSelectorComponent = (function () {
    function TypeSelectorComponent(appService) {
        this.appService = appService;
        this.EventTypeSelector = new core_1.EventEmitter();
    }
    TypeSelectorComponent.prototype.ngOnInit = function () {
        this.ElementTypes = [];
        this.ElementTypes.push({ label: 'Documents', value: { id: 1, name: 'Documents', code: 'document_type' } });
        this.ElementTypes.push({ label: 'Accounts', value: { id: 2, name: 'Accounts', code: 'account_type' } });
        this.ElementTypes.push({ label: 'Agents', value: { id: 3, name: 'Agents', code: 'agent_type' } });
        this.ElementTypes.push({ label: 'Entities', value: { id: 4, name: 'Entities', code: 'entity_type' } });
        this.ElementTypes.push({ label: 'Miscs', value: { id: 5, name: 'Miscs', code: 'misc_type' } });
        this.ElementTypes.push({ label: 'Templates', value: { id: 6, name: 'Templates', code: 'template_type' } });
        //set dedault value of type selector
        this.selectedType = this.ElementTypes[0];
        //console.log(this.selectedType.value.code);
        this.appService.setTypeSelector(this.selectedType.value.code);
    };
    TypeSelectorComponent.prototype.onChangeDropDown = function (e) {
        //console.log(e.value.code);
        this.EventTypeSelector.emit(e.value.code);
        this.appService.setTypeSelector(e.value.code);
    };
    return TypeSelectorComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TypeSelectorComponent.prototype, "EventTypeSelector", void 0);
TypeSelectorComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'type-selector',
        templateUrl: 'type-selector.component.html',
        styleUrls: ['type-selector.component.css']
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], TypeSelectorComponent);
exports.TypeSelectorComponent = TypeSelectorComponent;
//# sourceMappingURL=type-selector.component.js.map