import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/distinctuntilchanged';
import { environment } from '../../environments/environment';

import {Entities, Agents, PriceLists, Price,
        Binders, Templates, Operation} from '../model';

@Injectable()
export class MainformService {
    private urlPrefix = environment.urlPrefix;
    private searchUrlEntity = this.urlPrefix+'/sp_findentities';
    private searchUrlAgent: string = this.urlPrefix+'/sp_findagent';
    private gethUrlPriceLists: string = this.urlPrefix+'/sp_search_pricelists';
    private searchUrlBinder: string = this.urlPrefix+'/sp_search_binders';
    private searchUrlTemplate: string = this.urlPrefix+'/sp_template';
    private gethUrlOperation: string = this.urlPrefix+'/sp_search_operations';
    private currentTemplate = new BehaviorSubject<Templates>({'id':0,'tmlGuid':'','tmlName':'ww','frmId':'', 'tmlScript':''});
    
    constructor(private http: Http) { }
    
    searchEntity (criteria: string, valuestr: string, valuelong: number): Observable<Entities[]> {
        let params = new URLSearchParams();
        params.set('criteria', criteria);
        params.set('valuestr', valuestr);
        params.set('valuelong', String(valuelong));
        return this.http
            .get(this.searchUrlEntity, { search: params })
            .map(response => response.json())
    }

    searchAgent (criteria: string, term: string, termLng: number): Observable<Agents[]> {
        //console.log('searchAgent', term, nameField);
        let params = new URLSearchParams();
        params.set('criteria', criteria);
        params.set('valuestr', term);
        params.set('valuelong', String(termLng));
        return this.http
            .get(this.searchUrlAgent, { search: params })
            .map(response => response.json())
    }

    //add fake array ???
    searchAgentPromise (criteria: string, term: string, termLng: number):Promise<Agents[]> {
        let params = new URLSearchParams();
        params.set('criteria', criteria);
        params.set('valuestr', term);
        params.set('valuelong', String(termLng));
        return this.http
            .get(this.searchUrlAgent, { search: params })
            .toPromise()
            .then((response: Response) => response.json() || {})
            .catch(this.handleError);
    }

    getPriceLists (): Observable<PriceLists[]> {
        return this.http
            .get(this.gethUrlPriceLists)
            .map(response => response.json())
            .catch(this.handleError);
    }

    searchBinder (term: string): Observable<Binders[]> {
        let params = new URLSearchParams();
        params.set('bindername', term);
        return this.http
            .get(this.searchUrlBinder, { search: params })
            .map(response => response.json())
            .catch(this.handleError);
    }

    searchTemplate (tmlid: string, mode: string): Observable<Templates[]> {
        let params = new URLSearchParams();
        params.set('tmlid', tmlid);
        params.set('mode', mode);
        return this.http
            .get(this.searchUrlTemplate, { search: params })
            .map(response => response.json())
            .catch(this.handleError);
    }

    searchOperation(term: string): Observable<Operation[]> {
        let params = new URLSearchParams();
        params.set('docid', term);
        return this.http
            .get(this.gethUrlOperation, { search: params })
            .map(response => response.json())
            .catch(this.handleError);

    }

/*     setOperation(term: string){
        this.searchOperation(term).subscribe(v => {this.operation.next(v)})
    } */

/*     getOperation(term: string): Observable<Operation>{
            this.searchOperation()
            .distinctUntilChanged()
            .subscribe(
            v => {this.operation.next(v);}
        )
        //console.log(this.operation);
        return this.operation;
    } */

    getDateToStringFormat(): string{
        let d = new Date();
        let s: string;
        let DayNo: string = d.getDate().toString();
        if (d.getDate() < 10) DayNo = '0' + d.getDate().toString();
        let MontNo: string = d.getMonth().toString();
        if (d.getMonth() < 10) MontNo = '0' + d.getMonth().toString();
        let HoursNo: string = d.getHours().toString();
        if (d.getHours() < 10) HoursNo = '0' + d.getHours().toString();
        let MinutesNo: string =  d.getMinutes().toString()+':00';
        if (d.getMinutes() < 10) MinutesNo = '0'+d.getMinutes().toString()+':00';
        s = d.getFullYear().toString();
        s = s +'-'+MontNo+'-'+DayNo+'T'+HoursNo+':'+MinutesNo;
        return s
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    setCurTemplate(e: number){
        this.searchTemplate(String(e), '1').subscribe(
            (res) => this.currentTemplate.next(res[0])
        )
    }

    getCurTemplate(): Observable<Templates> {
        return this.currentTemplate.asObservable();
    }

//    getTypeSelector(): Observable<string> {return this.typeSelector.asObservable();}
//    setTypeSelector(s: string){this.typeSelector.next(s);}
}