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
    private trans : Transactions[] = [];
    private agToId: number = 0;
    private agFromId: number = 0;
    private currentOperation = new BehaviorSubject<Op>({})

    constructor(private http: Http,
                private mformService: MainformService) {
        this.mformService.getCurTemplate().subscribe(
            (v) => { if (v != undefined) {
                    this.op.tml_id = v.id;
                    this.op.doc_name=v.tmlName;
                }
            })
        this.op.doc_date = this.mformService.getDateToStringFormat();
        //this.op.doc_name = 'новый документ*';
        if (this.op.doc_id === undefined) this.op.transactions = [{'j_ag1':0, 'j_ag2':0}];
        this.op.binders = [];
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
         if (term === 'searchAgentTo'){
            this.op.transactions[0].j_ag1 = agId;
            this.agToId = agId;
        } else {
            this.op.transactions[0].j_ag2 = agId;
            this.agFromId = agId;
        }
        //this.currentOperation.next(this.op);  ---пропадает doc_no ?
    }

    setDocNoDate(docNo: string, docDate: string, docName: string){
        let o: Op;
        o = this.op;
        o.doc_no = docNo;
        o.doc_date = docDate;
        o.doc_name = docName;
        this.op = o;
        this.currentOperation.next(this.op);
        //console.log(JSON.stringify(this.op));
    }

    getCurrentOperation(): Observable<Op>{
        return this.currentOperation.asObservable();
    }

    clearOp(){
        this.op.doc_date = this.mformService.getDateToStringFormat();
        this.op.doc_name = 'новый документ*';
        this.op.doc_no = null;
        this.op.transactions = [{'j_ag1':0, 'j_ag2':0}];
        this.op.binders = [];
        this.op.tml_id = null;
        this.currentOperation.next(this.op);
    }

    setOpTemplate(t: Templates){
        this.op.tml_id = t.id;
        this.op.doc_name = t.tmlName;
        //this.currentOperation.next(this.op);
    }

    setTrans(){
        let index: number;
        if (this.op.doc_id === undefined) {
            index = 0;
        } else {
            //index = tr.length;
        }
        //console.log(tr);
        this.op.transactions.length = 0;
        this.op.transactions.push(...this.trans);
        //console.log('setTrans ' +JSON.stringify(this.op.transactions));
        this.currentOperation.next(this.op);
        this.trans.length = 0;
        //console.log(JSON.stringify(this.op));
    }

    setTrans2(e: Entities){
        let trs = [...this.trans];
        let tr: Transactions = {};
        tr.j_ag1 = this.agToId;
        tr.j_ag2 = this.agFromId;
        tr.j_done = 0;
        tr.j_date = this.op.doc_date;
        tr.j_ent = e.id;
        tr.mc_id = 1;
        tr.entName = e.entName;
        tr.entNom = e.entNom
        trs.push(tr);
        this.trans = trs;
        //console.log('setTrans2 ' +JSON.stringify(this.trans));
    }
    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}