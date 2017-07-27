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

    private IpHost = '172.16.9.2';  //
    private portHost = '8080';      //3004

    private searchUrlEntity = 'http://'+ this.IpHost+ ':'+ this.portHost +'/sp_search_entities';
    private searchUrlAgent: string = 'http://'+ this.IpHost+ ':'+ this.portHost +'/sp_search_agents';
    private gethUrlPriceLists: string = 'http://'+ this.IpHost+ ':'+ this.portHost +'/sp_search_pricelists';
    private searchUrlBinder: string = 'http://'+ this.IpHost+ ':'+ this.portHost +'/sp_search_binders';
    private searchUrlTemplate: string = 'http://'+ this.IpHost+ ':'+ this.portHost +'/sp_search_templates';

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
        /* localStorage.removeItem('price_lists');
        const prl_data = localStorage.getItem('price_lists');
        if (prl_data == null) {
            let a = this.http
                .get(this.gethUrlPriceLists)
                .map(response => response.json())
                .subscribe(
                    (v) => {localStorage.setItem('price_lists', JSON.stringify(v))}
                )
        } */
        //console.log(localStorage.getItem('price_lists'));
        //let b = localStorage.getItem('price_lists');
        return this.http
            .get(this.gethUrlPriceLists)
            //.get('src/app/services/test.json')
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