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
var CalendarComponent = (function () {
    function CalendarComponent(appService) {
        this.appService = appService;
        this.dateValue = new Date();
    }
    CalendarComponent.prototype.ngOnInit = function () {
        //this.dateValue = new Date();
        this.appService.setCalendar(String(this.dateValue.toLocaleDateString()), String(this.dateValue.toLocaleDateString()));
    };
    CalendarComponent.prototype.onSelectDate = function (value) {
        //this.appService.searchDocs(String(this.selectedFolder.id | 0), String(this.dateValue.toLocaleDateString()))
        this.appService.setCalendar(String(this.dateValue.toLocaleDateString()), String(this.dateValue.toLocaleDateString()));
        this.appService.searchDocs4();
    };
    return CalendarComponent;
}());
CalendarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'calendar',
        templateUrl: 'calendar.component.html',
        styleUrls: ['calendar.component.css'],
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], CalendarComponent);
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.component.js.map