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
var index_1 = require("../../model/index");
var app_service_1 = require("../../services/app.service");
var EditDialogComponent = (function () {
    function EditDialogComponent(appService) {
        this.appService = appService;
        this.addDocEvent = new core_1.EventEmitter();
    }
    EditDialogComponent.prototype.ngOnInit = function () { };
    EditDialogComponent.prototype.getAll = function () {
        var _this = this;
        this.appService.searchDocs2().subscribe(function (val) {
            _this.addDocEvent.emit(_this.document);
            //console.log(JSON.stringify(val))
        });
    };
    EditDialogComponent.prototype.onOpenDlg = function () {
        this.formId = this.appService.getCurrentFolder().formId;
        this.docIsNew = false;
        this.displayDialog = true;
    };
    EditDialogComponent.prototype.onOpenDlgNew = function () {
        this.docIsNew = true;
        this.document = new index_1.Document(1, "test", new Date().toLocaleDateString(), 0, 0, '');
        this.displayDialog = true;
    };
    EditDialogComponent.prototype.close = function () { this.displayDialog = false; };
    EditDialogComponent.prototype.save = function () {
        var _this = this;
        if (this.docIsNew) {
            var a = this.appService.saveDoc(this.document).subscribe(function (v) { _this.getAll(); }, function (err) { console.log('error'); });
        }
        else {
            var a = this.appService.updateDocPromise(this.document);
        }
        this.displayDialog = false;
    };
    return EditDialogComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", index_1.Document)
], EditDialogComponent.prototype, "document", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], EditDialogComponent.prototype, "addDocEvent", void 0);
EditDialogComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'editDialog',
        templateUrl: 'edit.dialog.component.html'
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], EditDialogComponent);
exports.EditDialogComponent = EditDialogComponent;
//# sourceMappingURL=edit.dialog.component.js.map