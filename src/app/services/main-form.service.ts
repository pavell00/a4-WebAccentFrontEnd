import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';

import {Entities} from '../model/entity';
import {Agents} from '../model/agent';
import {PriceLists, Price} from '../model/priceLists';
import {Binders} from '../model/binder';
import {Templates} from '../model/template';

@Injectable()
export class MainformService {

    searchUrlEntity: string = 'http://localhost:3004/entities';
    searchUrlAgent: string = 'http://localhost:3004/agents';
    gethUrlPriceLists: string = 'http://localhost:3004/pricelists';
    searchUrlBinder: string = 'http://localhost:3004/binders';
    searchUrlTemplate: string = 'http://localhost:3004/templates';

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
    }

    searchBinder (term: string, nameField: string): Observable<Binders[]> {
        //console.log('searchAgent', term, nameField);
        let params = new URLSearchParams();
        params.set(nameField+'_like', term);
        return this.http
                .get(this.searchUrlBinder, { search: params })
                .map(response => response.json())
    }

    searchTemplate (term: string, nameField: string): Observable<Templates[]> {
        //console.log('searchTemplate', term, nameField);
        let params = new URLSearchParams();
        params.set(nameField, term);
        return this.http
                .get(this.searchUrlTemplate, { search: params })
                .map(response => response.json())
    }
}