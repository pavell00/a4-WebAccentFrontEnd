import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/distinctuntilchanged';

import {Entities, Agents, PriceLists, Price,
        Binders, Templates, Operation} from '../model';

@Injectable()
export class MainformService {

    private operation = new Subject<Operation>();
    docId: number = 0;

    private IpHost = '172.16.9.2';  //
    private portHost = '8080';      //3004
    private searchUrlEntity = 'http://'+ this.IpHost+ ':'+ this.portHost +'/sp_search_entities';
    private searchUrlAgent: string = 'http://'+ this.IpHost+ ':'+ this.portHost +'/sp_search_agents';
    private gethUrlPriceLists: string = 'http://'+ this.IpHost+ ':'+ this.portHost +'/sp_search_pricelists';
    private searchUrlBinder: string = 'http://'+ this.IpHost+ ':'+ this.portHost +'/sp_search_binders';
    private searchUrlTemplate: string = 'http://'+ this.IpHost+ ':'+ this.portHost +'/sp_search_templates';
    private gethUrlOperation: string = 'http://'+ this.IpHost+ ':'+ this.portHost +'/sp_search_operations';

    constructor(private http: Http) { }
    
    searchEntity (term: string, nameField: string): Observable<Entities[]> {
        //console.log('searchEntity', term, nameField);
        let params = new URLSearchParams();
        params.set(nameField+'_like', term);
        return this.http
            .get(this.searchUrlEntity, { search: params })
            .map(response => response.json())
    }

    searchAgent (term: string, nameField: string): Observable<Agents[]> {
        //console.log('searchAgent', term, nameField);
        let params = new URLSearchParams();
        params.set(nameField+'_like', term);
        return this.http
            .get(this.searchUrlAgent, { search: params })
            .map(response => response.json())
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

    searchTemplate (term: string, nameField: string): Observable<Templates[]> {
        let params = new URLSearchParams();
        params.set(nameField, term);
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

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}