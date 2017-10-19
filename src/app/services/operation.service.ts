import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { MainformService } from './main-form.service';

import { Entities, Agents, PriceLists, Price,
    Binders, Templates, Op, Transactions } from '../model';

@Injectable()
export class OperationService {

    private urlPrefix = environment.urlPrefix;
    private gethUrlOperation: string = this.urlPrefix+'/sp_search_operation';
    private op = new Op();
/*     private currentOperation = new BehaviorSubject<Op>({'doc_name':'новый документ', 
        'doc_date':this.mformService.getDateToStringFormat(),
        'doc_no':'0'
        }); */
       //'transactions': {'key':{'j_ag1':0, 'j_ag2':0}}
    private currentOperation = new BehaviorSubject<Op>({})

    constructor(private http: Http,
                private mformService: MainformService) {
        this.op.doc_date = this.mformService.getDateToStringFormat();
        this.op.doc_name = 'новый документ*';
        this.op.transactions = [{'j_ag1':0, 'j_ag2':0}];
        this.currentOperation.next(this.op);
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

    setAgents(agId : number|null, term: string) {
/*         let tr = new Transactions;
        tr.j_ag1 = agToId;
        tr.j_ag2 = agFromId;
        this.op.transactions.push(tr); */
        if (term === 'searchAgentTo'){
            this.op.transactions[0].j_ag1 = agId;
        } else {
            this.op.transactions[0].j_ag2 = agId;
        }
        this.currentOperation.next(this.op);
    }

    saveDoc(docNo: string, docDate: string, docName: string){
        this.op.doc_no = docNo;
        this.op.doc_date = docDate;
        this.op.doc_name = docName;
        this.currentOperation.next(this.op);
    }

    getCurrentOperation(): Observable<Op>{
        return this.currentOperation.asObservable();
    }

    clearOp(){
        this.op.doc_date = this.mformService.getDateToStringFormat();
        this.op.doc_name = 'новый документ*';
        this.op.doc_no = null;
        this.op.transactions = [{'j_ag1':0, 'j_ag2':0}];
        this.currentOperation.next(this.op);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}