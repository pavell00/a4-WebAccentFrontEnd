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
var RootComponent = (function () {
    function RootComponent(appService) {
        this.appService = appService;
        this.checked = true;
    }
    RootComponent.prototype.ngOnInit = function () {
        var _this = this;
        /*this.appService.getCounter().subscribe(
             (v) => {this.counter = v;}
         )*/
        this.appService.getCalendarSartDt().subscribe(function (v) { _this.startDate = v; });
        this.appService.getCalendarEndDt().subscribe(function (v) { _this.endDate = v; });
    };
    return RootComponent;
}());
RootComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'root-app',
        templateUrl: 'root.component.html',
        styleUrls: ['root.component.css'],
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], RootComponent);
exports.RootComponent = RootComponent;
//# sourceMappingURL=root.component.js.map