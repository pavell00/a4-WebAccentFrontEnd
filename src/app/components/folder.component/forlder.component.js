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
var FolderComponent = (function () {
    function FolderComponent(appService) {
        this.appService = appService;
        this.bcrambFolders = [];
        this.EventFolderClick = new core_1.EventEmitter();
    }
    FolderComponent.prototype.ngOnInit = function () { this.getAll('document_type'); };
    FolderComponent.prototype.getAll = function (typeSelector) {
        var _this = this;
        //Initilize start folder ???
        this.appService.setCurrentFolder(new index_1.Folder(0, "", false, 0, typeSelector, 0));
        /*this.appService.searchFolderObserver("0").subscribe((val) => {this.folders = val});*/
        this.appService.searchFolder();
        this.appService.getFolders()
            .subscribe(function (val) { _this.folders = val; });
        //this.appService.getCurfld().subscribe((val) => {this.error = val});
        /*this.appService.searchDocs2().subscribe(
            (v) => {this.documentsOfFolder = v}
        )*/
    };
    FolderComponent.prototype.onSelectFolder = function (folder) {
        //console.log(JSON.stringify(folder));
        this.selectedFolder = folder;
        //this.appService.searchDocs(String(folder.id), String(this.dateValue.toLocaleDateString()))
        this.appService.setCurrentFolder(folder);
        /*console.log('folder.component-onSelectFolder(this.appService.searchDocs2().subscribe)')
        this.appService.searchDocs2().subscribe(
            (v) => {this.documentsOfFolder = v}
        )*/
        this.EventFolderClick.emit(this.selectedFolder);
        //this.appService.searchDocs4();
    };
    FolderComponent.prototype.onDblClick = function (folder) {
        if (folder.isChildren) {
            this.appService.searchFolder();
            /*this.appService.searchDocs2().subscribe(
                    (v) => {this.documentsOfFolder = v}
                )*/
            //this.appService.searchFolderObserver(String(folder.id)).subscribe((val) => {this.folders = val});
            //add items to BreadCramber Array
            this.bcrambFolders.push(new index_1.BreadCramber(folder.rootId, folder.name));
            this.appService.setBCramberObserver(this.bcrambFolders);
        }
    };
    FolderComponent.prototype.onChangeTypeSelector = function (e) {
        //console.log(e);
        this.getAll(e);
    };
    FolderComponent.prototype.ngOnDestroy = function () {
    };
    return FolderComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FolderComponent.prototype, "EventFolderClick", void 0);
FolderComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'folder',
        templateUrl: 'folder.component.html'
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], FolderComponent);
exports.FolderComponent = FolderComponent;
//# sourceMappingURL=forlder.component.js.map