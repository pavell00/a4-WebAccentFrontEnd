import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, Response, 
         URLSearchParams, RequestOptions, Jsonp } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctuntilchanged';

import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
//import {} from 'rxjs';

import {Folder, Document, Journal, Entity, BreadCramber} from '../model/index'

@Injectable()
export class AppService {

  private docs = new Subject<Document[]>();
  private folders = new Subject<Folder[]>();
  private journals = new Subject<Journal[]>();
  private entities = new Subject<Entity[]>();
  //private calendar = new BehaviorSubject('23.03.2017');
  private calendarStartDt = new BehaviorSubject(new Date().toLocaleDateString());
  private calendarEndDt = new BehaviorSubject(new Date().toLocaleDateString()); //'23.03.2017'
  private typeSelector = new BehaviorSubject<string>('document_type');

  private bcramberSource = new Subject<BreadCramber[]>();
  bcramberChange$ = this.bcramberSource.asObservable();

  /*private countSource = new BehaviorSubject<number>(0);
  getCounter(): Observable<number>{return this.countSource.asObservable();}
  setCounter(n:number){this.countSource.next(n);}*/

  private f: Folder;
  private currentFolderSource = new Subject<Folder>();
  currentFolderChange$ = this.currentFolderSource.asObservable().
    subscribe((res) => {this.f = res});

  //private currentFolderSource: BehaviorSubject<string> = new BehaviorSubject<string>("0");
  //currentFolderChange$ = this.currentFolderSource.asObservable();
  //Home - http://192.168.0.101
  private IpHost = '172.16.9.2';  //
  private portHost = '8080';      //3004
  private foldersUrl = 'http://'+ this.IpHost+ ':'+ this.portHost +'/sp_folders';
  private docmentsUrl = 'http://'+ this.IpHost+ ':'+ this.portHost +'/sp_documents';
  private journalsUrl = 'http://'+ this.IpHost+ ':'+ this.portHost +'/sp_journals';
  private entitiesUrl = 'http://'+ this.IpHost+ ':'+ this.portHost +'/sp_entities';
  
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private jsonp: Jsonp) { }
  
  setCurrentFolder(f: Folder){this.currentFolderSource.next(f);}
  getCurrentFolder(){return this.f;}//this.currentFolderSource;}
  //getDocs() : Observable<Document[]> {return this.docs;}

  setDocs(){this.searchDocs2().subscribe(v => {this.docs.next(v)})}
   getDocs() : Observable<Document[]> {
        this.searchDocs2()
            .distinctUntilChanged()
            .subscribe(
            v => {this.docs.next(v);}
      )
      return this.docs;
  } 
    
  //getDocs(){ return this.docs;}

  getFolders(): Observable<Folder[]> {return this.folders.asObservable();}

  getJournals(){return this.journals;}

  //getCalendar() : Observable<any> {return this.calendar.asObservable();}
  setCalendar(startDt: string, endDt: string){
      //this.calendar.next(endDt);
      this.calendarStartDt.next(startDt);
      this.calendarEndDt.next(endDt);
  }

  getCalendarSartDt(): Observable<string> { return this.calendarStartDt.asObservable(); }
  getCalendarEndDt(): Observable<string> { return this.calendarEndDt.asObservable(); }

  setBCramberObserver(b: BreadCramber[]){this.bcramberSource.next(b);}
  
  //setTypeSelector(c: string){this.currentTypeFolderSource.next(c);}
  //getTypeSelector(){return this.ct;}
  getTypeSelector(): Observable<string> {return this.typeSelector.asObservable();}
  setTypeSelector(s: string){this.typeSelector.next(s);}

  //setBCramber(s: BreadCramber){this.bcramberSource.push(s);}
  //getBCramber(){return this.bcramberSource;}

  saveDocPromise(d: Document){
    this.http.post(this.docmentsUrl, JSON.stringify(d), this.options)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError)
    this.searchDocs4();
    this.getDocs();
  }

  saveDoc(d: Document): Observable<Document[]>{
    //console.log(JSON.stringify(d));
    let a = this.http.post(this.docmentsUrl, JSON.stringify(d), this.options)
        .map(response => response.json())
    return a;
  }

  updateDocPromise(d: Document){
    this.http.put(`${this.docmentsUrl}/${d['id']}`, JSON.stringify(d), this.options)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError)
  }

  deleteDocPromise(id: string){
    /*this.docs.forEach(element => {
         console.log(element)
    });*/
    console.log(`${this.docmentsUrl}/${id}`);
    this.http.delete(`${this.docmentsUrl}/${id}`, this.options)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError)
     this.searchDocs4();
  }

  delDoc(id: string): Observable<Document[]>{
    /*this.docs.forEach(element => {
         console.log(element)
    });*/
    //console.log(`${this.docmentsUrl}/${id}`);
    return this.http.delete(`${this.docmentsUrl}/${id}`, this.options)
        .map(response => response.json())
        .catch(this.handleError)
  }

  searchFolder () {
    //console.log(this.f.typeFolder);
    let params = new URLSearchParams();
    params.set('rootid', String(this.f.id));
    params.set('typefolder', this.f.typeFolder);
    let a = this.http
        //.get(this.foldersUrl+'?rootId='+String(this.f.id)+'&typeFolder=document_type')
        .get(this.foldersUrl, { search: params })
        .map(response => <Folder[]> response.json())
        .distinctUntilChanged()
            a.subscribe(
                (val) => {this.folders.next(val)},
                (err) => (this.handleError)
            )
    //return a;
  }

    searchDocs2() : Observable<Document[]> {
        //this.docs.next(null);
        let term = String(this.f.id);
        //let curDate = this.calendar.getValue();//this.calendar;
        let curStartDate = this.calendarStartDt.getValue();
        let curEndDate = this.calendarEndDt.getValue();
        let currentStartDate = curStartDate.substring(6,10)+'-'+curStartDate.substring(3,5)+'-'+curStartDate.substring(0,2);
        let currentEndDate = curEndDate.substring(6,10)+'-'+curEndDate.substring(3,5)+'-'+curEndDate.substring(0,2);
        let t: string;
        this.getTypeSelector().subscribe(
            (v) => {t = v},
            (err) => (this.handleError),
            () => true
        );
        console.log('searchDocs2 : term = ' + term + '; currentStartDate = '
                + currentStartDate+'; currentEndDate = '+currentEndDate+ '; type_selector= '+ t);
        let params = new URLSearchParams();
        params.set('rootid', term);
        params.set('startdate', currentStartDate);
        params.set('enddate', currentEndDate);
        params.set('typedir', t);
        return this.http
            .get(this.docmentsUrl, { search: params })
            .map(response => <Document[]> response.json())
            //.map(response => this.docs.next(response))
            .catch(this.handleError);
    }

  searchDocs4(): Observable<Document[]> {
     //console.log("curent folder "+ this.f.id);
     let term = String(this.f.id);
     //let curDate = this.calendar.getValue();
     let curStartDate = this.calendarStartDt.getValue();
     let curEndDate = this.calendarEndDt.getValue();
     console.log(curStartDate, curEndDate);
     let currentStartDate = curStartDate.substring(6,10)+'-'+curStartDate.substring(3,5)+'-'+curStartDate.substring(0,2);
     let currentEndDate = curEndDate.substring(6,10)+'-'+curEndDate.substring(3,5)+'-'+curEndDate.substring(0,2);
    let t: string;
    this.getTypeSelector().subscribe(
        (v) => {t = v},
        (err) => (this.handleError),
        () => true
    );     
     //console.log('searchDocs4 ' +term);
     console.log('searchDocs4 ' +currentStartDate, currentEndDate);
     let params = new URLSearchParams();
     params.set('rootid', term);
     params.set('startdate', currentStartDate);
     params.set('enddate', currentEndDate);
     params.set('typedir', t);
     let a = this.http
        .get(this.docmentsUrl, { search: params })
        .map(response => <Document[]> response.json())
        .distinctUntilChanged()
            a.subscribe(
                (val) => {this.docs.next(val);//without filtering
                          //console.log(JSON.stringify(val))
                },
                (err) => (this.handleError),
                () => true
            );
     return a;
  }

  searchJournal (term: string) {
    let params = new URLSearchParams();
    params.set('docid', term);
    let a = this.http
        .get(this.journalsUrl, { search: params })
        .map(response => <Journal[]> response.json())
        .distinctUntilChanged()
            a.subscribe(
                (val) => {this.journals.next(val);},//without filtering
                (err) => (this.handleError)
            )
    return a;
  }

  searchEntity(term: string) {
    let params = new URLSearchParams();
    params.set('name', term);
    let a = this.http
        .get(this.entitiesUrl, { search: params })
        .map(response => <Entity[]> response.json())
            a.subscribe(
                (val) => {//this.entities.next(val);//without filtering
                    this.entities.next(
                        val.filter(val => val.name == term) //with filtering
                    );
                },
                (err) => (this.handleError)
            )
    return a;
  }

  private extractData(res: Response) {
    let body = res.json();
    //console.log(body);
    //this.todo_2.next(body.data);
    return body.data || { };
    //return body.data || { };
  }

  private handleError(error: any) {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }

//------------------------ EXample --------------
  searchFolderObserver (f: string):Observable<Folder[]> {
      //console.log(this.currentFolder);
      let params = new URLSearchParams();
      params.set('rootId', f);
      return this.http
        .get(this.foldersUrl, { search: params })
        .map(response => <Folder[]> response.json().data)
  }

  saveFolderPromise(f: Folder){
    this.http.post(this.foldersUrl, JSON.stringify(f), this.options)
        .toPromise()
        .then(response => response.json().data)
        .catch(this.handleError)
  }

  saveDocObs(d: Document): Observable<Document>{
    return this.http.post(this.docmentsUrl, JSON.stringify(d), this.options)
        .map(this.extractData)
        .catch(this.handleError);
    }

  searchDocs (term: string, currentDate: string) {
      let params = new URLSearchParams();
      params.set('fldId', term);
      let a = this.http
            .get(this.docmentsUrl, { search: params })
            .map(response => <Document[]> response.json().data)
                a.subscribe(
                   (val) => {//this.docs.next(val);//without filtering
                             this.docs.next(
                               val.filter(val => val.docDate == currentDate) //with filtering
                             );
                   },
                   (err) => (this.handleError)
                )
      return a;
  }

  searchDocs3 () {
      let term = String(this.f.id);
      let currentDate = this.calendarStartDt.getValue();
      let params = new URLSearchParams();
      params.set('fldId', term);

      let a = this.http
        .get(this.docmentsUrl, { search: params })
        .map(response => <Document[]> response.json().data)
            a.subscribe(
                (val) => {//this.docs.next(val);//without filtering
                    this.docs.next(
                    val.filter(val => val.docDate == currentDate) //with filtering
                    );
                },
                (err) => (this.handleError)
            )
      return a;
  }

  search (term: string): Observable<Document[]> {
      let params = new URLSearchParams();
      params.set('fldId', term);
      let a = this.http
            .get(this.docmentsUrl, { search: params })
            .map(response => response.json().data)
      return a;
  }

  search2() : Promise<Document[]> {
      return this.http.get(this.docmentsUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
  }

  search2query() : Promise<Document[]> {
      return this.http.get('http://172.16.9.2:3004/documents?dateItem>=12.05.2017')
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
  }

  search3() : Promise<Journal[]> {
      return this.http.get(this.journalsUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
  }
}