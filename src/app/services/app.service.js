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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/distinctuntilchanged");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Subject_1 = require("rxjs/Subject");
var AppService = (function () {
    function AppService(http, jsonp) {
        var _this = this;
        this.http = http;
        this.jsonp = jsonp;
        this.docs = new Subject_1.Subject();
        this.folders = new Subject_1.Subject();
        this.journals = new Subject_1.Subject();
        this.entities = new Subject_1.Subject();
        //private calendar = new BehaviorSubject('23.03.2017');
        this.calendarStartDt = new BehaviorSubject_1.BehaviorSubject(new Date().toLocaleDateString());
        this.calendarEndDt = new BehaviorSubject_1.BehaviorSubject(new Date().toLocaleDateString()); //'23.03.2017'
        this.typeSelector = new BehaviorSubject_1.BehaviorSubject('document_type');
        this.bcramberSource = new Subject_1.Subject();
        this.bcramberChange$ = this.bcramberSource.asObservable();
        this.currentFolderSource = new Subject_1.Subject();
        this.currentFolderChange$ = this.currentFolderSource.asObservable().
            subscribe(function (res) { _this.f = res; });
        //private currentFolderSource: BehaviorSubject<string> = new BehaviorSubject<string>("0");
        //currentFolderChange$ = this.currentFolderSource.asObservable();
        //Home - http://192.168.0.101
        this.IpHost = '172.16.9.2'; //
        this.portHost = '8080'; //3004
        this.foldersUrl = 'http://' + this.IpHost + ':' + this.portHost + '/sp_folders';
        this.docmentsUrl = 'http://' + this.IpHost + ':' + this.portHost + '/sp_documents';
        this.journalsUrl = 'http://' + this.IpHost + ':' + this.portHost + '/sp_journals';
        this.entitiesUrl = 'http://' + this.IpHost + ':' + this.portHost + '/sp_entities';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    AppService.prototype.setCurrentFolder = function (f) { this.currentFolderSource.next(f); };
    AppService.prototype.getCurrentFolder = function () { return this.f; }; //this.currentFolderSource;}
    //getDocs() : Observable<Document[]> {return this.docs;}
    AppService.prototype.setDocs = function () {
        var _this = this;
        this.searchDocs2().subscribe(function (v) { _this.docs.next(v); });
    };
    AppService.prototype.getDocs = function () {
        var _this = this;
        this.searchDocs2()
            .distinctUntilChanged()
            .subscribe(function (v) { _this.docs.next(v); });
        return this.docs;
    };
    //getDocs(){ return this.docs;}
    AppService.prototype.getFolders = function () { return this.folders.asObservable(); };
    AppService.prototype.getJournals = function () { return this.journals; };
    //getCalendar() : Observable<any> {return this.calendar.asObservable();}
    AppService.prototype.setCalendar = function (startDt, endDt) {
        //this.calendar.next(endDt);
        this.calendarStartDt.next(startDt);
        this.calendarEndDt.next(endDt);
    };
    AppService.prototype.getCalendarSartDt = function () { return this.calendarStartDt.asObservable(); };
    AppService.prototype.getCalendarEndDt = function () { return this.calendarEndDt.asObservable(); };
    AppService.prototype.setBCramberObserver = function (b) { this.bcramberSource.next(b); };
    //setTypeSelector(c: string){this.currentTypeFolderSource.next(c);}
    //getTypeSelector(){return this.ct;}
    AppService.prototype.getTypeSelector = function () { return this.typeSelector.asObservable(); };
    AppService.prototype.setTypeSelector = function (s) { this.typeSelector.next(s); };
    //setBCramber(s: BreadCramber){this.bcramberSource.push(s);}
    //getBCramber(){return this.bcramberSource;}
    AppService.prototype.saveDocPromise = function (d) {
        this.http.post(this.docmentsUrl, JSON.stringify(d), this.options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
        this.searchDocs4();
        this.getDocs();
    };
    AppService.prototype.saveDoc = function (d) {
        //console.log(JSON.stringify(d));
        var a = this.http.post(this.docmentsUrl, JSON.stringify(d), this.options)
            .map(function (response) { return response.json(); });
        return a;
    };
    AppService.prototype.updateDocPromise = function (d) {
        this.http.put(this.docmentsUrl + "/" + d['id'], JSON.stringify(d), this.options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AppService.prototype.deleteDocPromise = function (id) {
        /*this.docs.forEach(element => {
             console.log(element)
        });*/
        console.log(this.docmentsUrl + "/" + id);
        this.http.delete(this.docmentsUrl + "/" + id, this.options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
        this.searchDocs4();
    };
    AppService.prototype.delDoc = function (id) {
        /*this.docs.forEach(element => {
             console.log(element)
        });*/
        //console.log(`${this.docmentsUrl}/${id}`);
        return this.http.delete(this.docmentsUrl + "/" + id, this.options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AppService.prototype.searchFolder = function () {
        var _this = this;
        //console.log(this.f.typeFolder);
        var params = new http_1.URLSearchParams();
        params.set('rootid', String(this.f.id));
        params.set('typefolder', this.f.typeFolder);
        var a = this.http
            .get(this.foldersUrl, { search: params })
            .map(function (response) { return response.json(); })
            .distinctUntilChanged();
        a.subscribe(function (val) { _this.folders.next(val); }, function (err) { return (_this.handleError); });
        //return a;
    };
    AppService.prototype.searchDocs2 = function () {
        var _this = this;
        //this.docs.next(null);
        var term = String(this.f.id);
        //let curDate = this.calendar.getValue();//this.calendar;
        var curStartDate = this.calendarStartDt.getValue();
        var curEndDate = this.calendarEndDt.getValue();
        var currentStartDate = curStartDate.substring(6, 10) + '-' + curStartDate.substring(3, 5) + '-' + curStartDate.substring(0, 2);
        var currentEndDate = curEndDate.substring(6, 10) + '-' + curEndDate.substring(3, 5) + '-' + curEndDate.substring(0, 2);
        var t;
        this.getTypeSelector().subscribe(function (v) { t = v; }, function (err) { return (_this.handleError); }, function () { return true; });
        console.log('searchDocs2 : term = ' + term + '; currentStartDate = '
            + currentStartDate + '; currentEndDate = ' + currentEndDate + '; type_selector= ' + t);
        var params = new http_1.URLSearchParams();
        params.set('rootid', term);
        params.set('startdate', currentStartDate);
        params.set('enddate', currentEndDate);
        params.set('typedir', t);
        return this.http
            .get(this.docmentsUrl, { search: params })
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AppService.prototype.searchDocs4 = function () {
        var _this = this;
        //console.log("curent folder "+ this.f.id);
        var term = String(this.f.id);
        //let curDate = this.calendar.getValue();
        var curStartDate = this.calendarStartDt.getValue();
        var curEndDate = this.calendarEndDt.getValue();
        console.log(curStartDate, curEndDate);
        var currentStartDate = curStartDate.substring(6, 10) + '-' + curStartDate.substring(3, 5) + '-' + curStartDate.substring(0, 2);
        var currentEndDate = curEndDate.substring(6, 10) + '-' + curEndDate.substring(3, 5) + '-' + curEndDate.substring(0, 2);
        var t;
        this.getTypeSelector().subscribe(function (v) { t = v; }, function (err) { return (_this.handleError); }, function () { return true; });
        //console.log('searchDocs4 ' +term);
        console.log('searchDocs4 ' + currentStartDate, currentEndDate);
        var params = new http_1.URLSearchParams();
        params.set('rootid', term);
        params.set('startdate', currentStartDate);
        params.set('enddate', currentEndDate);
        params.set('typedir', t);
        var a = this.http
            .get(this.docmentsUrl, { search: params })
            .map(function (response) { return response.json(); })
            .distinctUntilChanged();
        a.subscribe(function (val) {
            _this.docs.next(val); //without filtering
            //console.log(JSON.stringify(val))
        }, function (err) { return (_this.handleError); }, function () { return true; });
        return a;
    };
    AppService.prototype.searchJournal = function (term) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('docid', term);
        var a = this.http
            .get(this.journalsUrl, { search: params })
            .map(function (response) { return response.json(); })
            .distinctUntilChanged();
        a.subscribe(function (val) { _this.journals.next(val); }, //without filtering
        function (err) { return (_this.handleError); });
        return a;
    };
    AppService.prototype.searchEntity = function (term) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('name', term);
        var a = this.http
            .get(this.entitiesUrl, { search: params })
            .map(function (response) { return response.json(); });
        a.subscribe(function (val) {
            _this.entities.next(val.filter(function (val) { return val.name == term; }) //with filtering
            );
        }, function (err) { return (_this.handleError); });
        return a;
    };
    AppService.prototype.extractData = function (res) {
        var body = res.json();
        //console.log(body);
        //this.todo_2.next(body.data);
        return body.data || {};
        //return body.data || { };
    };
    AppService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    //------------------------ EXample --------------
    AppService.prototype.searchFolderObserver = function (f) {
        //console.log(this.currentFolder);
        var params = new http_1.URLSearchParams();
        params.set('rootId', f);
        return this.http
            .get(this.foldersUrl, { search: params })
            .map(function (response) { return response.json().data; });
    };
    AppService.prototype.saveFolderPromise = function (f) {
        this.http.post(this.foldersUrl, JSON.stringify(f), this.options)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    AppService.prototype.saveDocObs = function (d) {
        return this.http.post(this.docmentsUrl, JSON.stringify(d), this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AppService.prototype.searchDocs = function (term, currentDate) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('fldId', term);
        var a = this.http
            .get(this.docmentsUrl, { search: params })
            .map(function (response) { return response.json().data; });
        a.subscribe(function (val) {
            _this.docs.next(val.filter(function (val) { return val.docDate == currentDate; }) //with filtering
            );
        }, function (err) { return (_this.handleError); });
        return a;
    };
    AppService.prototype.searchDocs3 = function () {
        var _this = this;
        var term = String(this.f.id);
        var currentDate = this.calendarStartDt.getValue();
        var params = new http_1.URLSearchParams();
        params.set('fldId', term);
        var a = this.http
            .get(this.docmentsUrl, { search: params })
            .map(function (response) { return response.json().data; });
        a.subscribe(function (val) {
            _this.docs.next(val.filter(function (val) { return val.docDate == currentDate; }) //with filtering
            );
        }, function (err) { return (_this.handleError); });
        return a;
    };
    AppService.prototype.search = function (term) {
        var params = new http_1.URLSearchParams();
        params.set('fldId', term);
        var a = this.http
            .get(this.docmentsUrl, { search: params })
            .map(function (response) { return response.json().data; });
        return a;
    };
    AppService.prototype.search2 = function () {
        return this.http.get(this.docmentsUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    AppService.prototype.search2query = function () {
        return this.http.get('http://172.16.9.2:3004/documents?dateItem>=12.05.2017')
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    AppService.prototype.search3 = function () {
        return this.http.get(this.journalsUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    return AppService;
}());
AppService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, http_1.Jsonp])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map