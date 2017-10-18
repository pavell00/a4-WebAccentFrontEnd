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
    Binders, Templates, Operation, Op, Transactions} from '../model';

@Injectable()
export class OperationService {

    private urlPrefix = environment.urlPrefix;
    private gethUrlOperation: string = this.urlPrefix+'/sp_search_operation';
    private op = new Op();
    private currentOperation = new BehaviorSubject<Op>({'doc_name':'новый документ', 
        'doc_date':this.mformService.getDateToStringFormat(),
        'doc_no':'0'
        });
       //'transactions': {'key':{'j_ag1':0, 'j_ag2':0}}

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
            //.do( data => console.log(data))
            .catch(this.handleError)
                a.subscribe(
                    (v) => {this.currentOperation.next(v[0])}
                )
        return a;
    }

    setAgents(agToId : number|null, agFromId : number|null) {
        let newOp = this.op;
/*         console.log(typeof this.op.transactions);
        console.log(typeof newOp.transactions);
        newOp.transactions[0].j_ag1 = agToId;// = {'j_ag1': agToId, 'j_ag2': agFromId};
        console.log(newOp.transactions); */
/*         if (newOp.transactions != undefined) {
            console.log(newOp.transactions[0].j_ag1);
            newOp.transactions[0].j_ag1 = agToId;
            newOp.transactions[0].j_ag2 = agFromId;
            //this.op = newOp;
            this.currentOperation.next(newOp);
        } */
        //this.currentOperation.next(newOp);
    }

    saveDoc(docNo: string, docDate: string, docName: string){
        var newOp = this.op;
        newOp.doc_no = docNo;
        newOp.doc_date = docDate;
        newOp.doc_name = docName;
        console.log(typeof newOp.transactions);
        //newOp["transactions"][0].j_ag1 = 1845;
        //newOp.transactions[0].j_ag1 = 1845;
        //newOp.transactions[0].j_ag2 = 7137;
        this.currentOperation.next(newOp);
        console.log(JSON.stringify(newOp));
    }

    getCurrentOperation(): Observable<Op>{
        return this.currentOperation.asObservable();
    }

    clearOp(){
        let op = new Op();
        op.doc_name = 'новый';
        op.doc_date = this.mformService.getDateToStringFormat();
        //op.transactions[0].j_ag1 = null;
        //op.transactions[0].j_ag2 = null;
        this.currentOperation.next(op);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}