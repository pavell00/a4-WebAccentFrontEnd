import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { MainformService } from './main-form.service'

import {Entities, Agents, PriceLists, Price,
    Binders, Templates, Operation, Op} from '../model';

@Injectable()
export class OperationService {

    private urlPrefix = environment.urlPrefix;
    private gethUrlOperation: string = this.urlPrefix+'/sp_search_operation';
    private op = new Op();
    private currentOperation = new BehaviorSubject<Op>({'doc_name':'новый', 'doc_date':this.mformService.getDateToStringFormat()});

    constructor(private http: Http,
                private mformService: MainformService) {
/*         this.op.doc_date = this.mformService.getDateToStringFormat();
        this.op.doc_name = 'не сохранен'
        this.currentOperation.next(this.op);
        console.log(this.op); */
    }

    searchOperation(term: string, trNo: string): Observable<Op[]> {
        let params = new URLSearchParams();
        params.set('docid', term);
        params.set('transno', trNo);
        let a = this.http
            .get(this.gethUrlOperation, { search: params })
            .map(response => response.json())
            .catch(this.handleError)
                a.subscribe(
                    (v) => {this.currentOperation.next(v[0])}
                )
        return a;
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

    getCurrentOperation(): Observable<Op>{
        return this.currentOperation.asObservable();
    }

    clearOp(){
        let op = new Op();
        op.doc_name = 'новый';
        op.doc_date = this.mformService.getDateToStringFormat();
        this.currentOperation.next(op);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}