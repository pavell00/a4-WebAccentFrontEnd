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
var Subject_1 = require("rxjs/Subject");
var DocumentComponent = (function () {
    function DocumentComponent(appService) {
        this.appService = appService;
        this.documentSource = new Subject_1.Subject();
        this.documentSelect$ = this.documentSource.asObservable();
        this.counter = 0;
    }
    DocumentComponent.prototype.ngOnInit = function () {
        //this.getAll();
        //this.getAll2();
    };
    DocumentComponent.prototype.getAll = function () {
        var _this = this;
        //console.log('documents.component-getAll(this.appService.getDocs().subscribe)')
        this.appService.getDocs().subscribe(function (val) {
            _this.docs = val;
            _this.counter = _this.docs.length;
        });
        this.documentSelect$.subscribe(function (v) { _this.document = v; });
    };
    DocumentComponent.prototype.getAll2 = function () {
        this.appService.searchDocs2().subscribe(function (val) { console.log(JSON.stringify(val)); });
    };
    DocumentComponent.prototype.onRowSelect = function (event) {
        //this.selectedDocument = event.data;
        this.documentSource.next(this.selectedRow);
        this.appService.searchJournal(String(this.selectedRow.id));
    };
    DocumentComponent.prototype.onDeleteDoc = function (event) {
        var _this = this;
        //this.docs.splice(this.findSelectedDocIndex(), 1);
        //console.log(JSON.stringify(this.selectedRow))
        if (this.selectedRow != undefined) {
            this.appService.delDoc(String(this.selectedRow.id)).subscribe(function (v) {
                _this.getAll();
                return true;
            });
        }
    };
    DocumentComponent.prototype.onGetDocs = function (a) {
        //console.log(this.documents.documentsOfFooler);
        //this.docs = this.documents.documentsOfFooler;
        //console.log(a);
        this.getAll();
    };
    DocumentComponent.prototype.rowStyle = function (rowData, rowIndex) {
        return rowData.docDone == 2 ? 'green-row-class' : 'red-row-class';
    };
    DocumentComponent.prototype.onDCC = function (event) {
        console.log('onDCC()');
    };
    DocumentComponent.prototype.loadDocsLazy = function (event) {
        //console.log(event.first, event.rows );
        //in a real application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort with
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
        if (this.docs) {
            this.docLazy = this.docs.slice(event.first, (event.first + event.rows));
        }
    };
    DocumentComponent.prototype.mysort = function (event) {
        console.log(event.field, event.order);
    };
    return DocumentComponent;
}());
DocumentComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'document',
        templateUrl: 'document.component.html'
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], DocumentComponent);
exports.DocumentComponent = DocumentComponent;
//# sourceMappingURL=document.component.js.map