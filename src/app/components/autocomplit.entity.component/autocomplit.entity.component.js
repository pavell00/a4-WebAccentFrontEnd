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
//import {} from 'rxjs'
var AutoComplitEntityComponent = (function () {
    function AutoComplitEntityComponent(appService) {
        this.appService = appService;
    }
    AutoComplitEntityComponent.prototype.ngOnInit = function () { };
    AutoComplitEntityComponent.prototype.search = function (event) {
        var _this = this;
        var query = event.query;
        this.appService.searchEntity(query).subscribe(function (v) { _this.results = v; });
    };
    AutoComplitEntityComponent.prototype.getData = function (event) {
        //console.log(event.entId);
        this.selectedRow = event;
        //console.log(this.selectedRow.entId);
    };
    return AutoComplitEntityComponent;
}());
AutoComplitEntityComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'entity',
        templateUrl: 'autocomplit.entity.component.html'
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AutoComplitEntityComponent);
exports.AutoComplitEntityComponent = AutoComplitEntityComponent;
//# sourceMappingURL=autocomplit.entity.component.js.map