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
var index_1 = require("../../model/index");
var BreadCramberComponent = (function () {
    function BreadCramberComponent(appService) {
        this.appService = appService;
        this.bcrambList = [];
    }
    BreadCramberComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.bcramberChange$.subscribe(function (v) { _this.bcrambList = v; });
        this.appService.getTypeSelector().subscribe(function (v) { _this.currentTypeSelector = v; });
    };
    BreadCramberComponent.prototype.onClickBCramb = function (bcramb) {
        //removing selected item from bcramb array
        var index = this.bcrambList.indexOf(bcramb, 0);
        var size = this.bcrambList.length;
        if (index > -1) {
            this.bcrambList.splice(index, size);
        }
        //this.appService.setCurfld(String(bcramb.rootId));
        //console.log('this.typeSelector '+ this.typeSelector);
        this.appService.setCurrentFolder(new index_1.Folder(bcramb.rootId, bcramb.name, true, 0, this.currentTypeSelector, 0));
        this.appService.searchFolder();
        //console.log(String(bcramb.id));
        //this.appService.searchFolderObserver("0").subscribe((val) => {this.error = val});;
    };
    BreadCramberComponent.prototype.clearBCramb = function () { this.bcrambList.length = 0; };
    return BreadCramberComponent;
}());
BreadCramberComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'breadcramber',
        templateUrl: 'breadcramber.component.html',
        styleUrls: ['breadcramber.component.css'],
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], BreadCramberComponent);
exports.BreadCramberComponent = BreadCramberComponent;
//# sourceMappingURL=breadcramber.component.js.map