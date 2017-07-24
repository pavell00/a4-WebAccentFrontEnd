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
var JournalComponent = (function () {
    function JournalComponent(appService) {
        this.appService = appService;
    }
    JournalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.getJournals().subscribe(function (val) { _this.journals = val; });
    };
    JournalComponent.prototype.onRowSelect = function (row) {
        //this.selectedRow = row;
    };
    return JournalComponent;
}());
JournalComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'journal',
        templateUrl: 'journal.component.html'
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], JournalComponent);
exports.JournalComponent = JournalComponent;
//# sourceMappingURL=journal.component.js.map