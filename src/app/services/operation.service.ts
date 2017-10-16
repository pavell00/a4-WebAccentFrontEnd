import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import { environment } from '../../environments/environment';

import {Entities, Agents, PriceLists, Price,
    Binders, Templates, Operation, Op} from '../model';

@Injectable()
export class OperationService {

    private urlPrefix = environment.urlPrefix;
    private gethUrlOperation: string = this.urlPrefix+'/sp_search_operation';
    private op = new Op();
    private currentOperation = new Subject<Op>();

    constructor(private http: Http) { }

    searchOperation(term: string, trNo: string): Observable<Operation[]> {
        let params = new URLSearchParams();
        params.set('docid', term);
        params.set('transno', trNo);
        return this.http
            .get(this.gethUrlOperation, { search: params })
            .map(response => response.json())
            .catch(this.handleError);

    }

    setDocNo(docNo: string){
        this.op.doc_no = docNo;
        this.currentOperation.next(this.op);
    }

    setDocDate(docDate: string){
        this.op.doc_date = docDate;
        this.currentOperation.next(this.op);
    }

    setDocName(docName: string){
        this.op.doc_name = docName;
        this.currentOperation.next(this.op);
    }

    getCurrentOperation(): Observable<Operation>{
        return this.currentOperation.asObservable();
    }


    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}