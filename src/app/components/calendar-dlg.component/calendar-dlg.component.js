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
var CalendarDlgComponent = (function () {
    function CalendarDlgComponent(appService) {
        this.appService = appService;
        this.display = false;
        this.years = [];
        this.months = [];
        this.quartals = [];
        this.semiyears = [];
    }
    CalendarDlgComponent.prototype.ngOnInit = function () {
        this.years.push({ label: '2016', value: 2016 });
        this.years.push({ label: '2017', value: 2017 });
        this.years.push({ label: '2018', value: 2018 });
        //set default year
        this.selectedYear = new Date().getFullYear();
        this.months.push({ label: 'Январь', value: 0 });
        this.months.push({ label: 'Февраль', value: 1 });
        this.months.push({ label: 'Март', value: 2 });
        this.months.push({ label: 'Апрель', value: 3 });
        this.months.push({ label: 'Май', value: 4 });
        this.months.push({ label: 'Июнь', value: 5 });
        this.months.push({ label: 'Июль', value: 6 });
        this.months.push({ label: 'Август', value: 7 });
        this.months.push({ label: 'Сентябрь', value: 8 });
        this.months.push({ label: 'Октябрь', value: 9 });
        this.months.push({ label: 'Ноябрь', value: 10 });
        this.months.push({ label: 'Декабрь', value: 11 });
        //set default date
        this.selectedMonth = (new Date().getMonth());
        this.onMonth(this.selectedMonth);
        this.quartals.push({ label: 'Первый', value: 1 });
        this.quartals.push({ label: 'Второй', value: 2 });
        this.quartals.push({ label: 'Третий', value: 3 });
        this.quartals.push({ label: 'Четвертый', value: 4 });
        this.semiyears.push({ label: 'Первое', value: 1 });
        this.semiyears.push({ label: 'Второе', value: 2 });
    };
    CalendarDlgComponent.prototype.showDialog = function () { this.display = true; };
    CalendarDlgComponent.prototype.onOkClick = function () {
        this.appService.setCalendar(this.startDate, this.endDate);
        this.appService.searchDocs4();
    };
    CalendarDlgComponent.prototype.onMonth = function (n) {
        this.selectedMonth = n;
        var d = new Date();
        //first day of month
        d.setDate(1);
        d.setMonth(n);
        d.setFullYear(this.selectedYear);
        this.onSelectStartDate(d);
        //last day of month
        var d2 = new Date(this.selectedYear, n + 1, 0);
        this.onSelectEndDate(d2);
    };
    CalendarDlgComponent.prototype.onQuartal = function (n) {
        var d = new Date();
        var d2 = new Date();
        d.setDate(1);
        switch (n) {
            case 1:
                d.setMonth(0);
                d.setFullYear(this.selectedYear);
                this.onSelectStartDate(d);
                d2 = new Date(this.selectedYear, 3, 0);
                this.onSelectEndDate(d2);
                break;
            case 2:
                d.setMonth(3);
                d.setFullYear(this.selectedYear);
                this.onSelectStartDate(d);
                d2 = new Date(this.selectedYear, 6, 0);
                this.onSelectEndDate(d2);
                break;
            case 3:
                d.setMonth(6);
                d.setFullYear(this.selectedYear);
                this.onSelectStartDate(d);
                d2 = new Date(this.selectedYear, 9, 0);
                this.onSelectEndDate(d2);
                break;
            case 4:
                d.setMonth(9);
                d.setFullYear(this.selectedYear);
                this.onSelectStartDate(d);
                d2 = new Date(this.selectedYear, 11, 31);
                this.onSelectEndDate(d2);
                break;
            default:
                alert("Wrong Quartal!");
                break;
        }
    };
    CalendarDlgComponent.prototype.onSemiyear = function (n) {
        var d = new Date();
        var d2 = new Date();
        d.setDate(1);
        switch (n) {
            case 1:
                d.setMonth(0);
                d.setFullYear(this.selectedYear);
                this.onSelectStartDate(d);
                d2 = new Date(this.selectedYear, 6, 0);
                this.onSelectEndDate(d2);
                break;
            case 2:
                d.setMonth(6);
                d.setFullYear(this.selectedYear);
                this.onSelectStartDate(d);
                d2 = new Date(this.selectedYear, 11, 31);
                this.onSelectEndDate(d2);
                break;
            default:
                alert("Wrong Semiyear!");
                break;
        }
    };
    CalendarDlgComponent.prototype.onCurrentYear = function () {
        this.onSelectStartDate(new Date(this.selectedYear, 0, 1));
        this.onSelectEndDate(new Date(this.selectedYear, 11, 31));
    };
    CalendarDlgComponent.prototype.onAllData = function () {
        this.onSelectStartDate(new Date(2000, 0, 1));
        this.onSelectEndDate(new Date(2040, 11, 31));
    };
    CalendarDlgComponent.prototype.onSelectStartDate = function (d) {
        this.startDate = d.toLocaleDateString();
    };
    CalendarDlgComponent.prototype.onSelectEndDate = function (d) {
        this.endDate = d.toLocaleDateString();
    };
    return CalendarDlgComponent;
}());
CalendarDlgComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'calendar-dlg',
        templateUrl: 'calendar-dlg.component.html',
        styleUrls: ['calendar-dlg.component.css']
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], CalendarDlgComponent);
exports.CalendarDlgComponent = CalendarDlgComponent;
//# sourceMappingURL=calendar-dlg.component.js.map