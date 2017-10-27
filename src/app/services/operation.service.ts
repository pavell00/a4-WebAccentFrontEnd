import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';
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

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    private urlPrefix = environment.urlPrefix;
    private operationUrl: string = this.urlPrefix+'/sp_search_operation';
    private addOperationUrl = this.urlPrefix+'/sp_add_operation';

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
                    this.op.frm_id = v.frmId;
                    this.op.fld_id = v.fldId;
                }
            })
        this.op.doc_date = this.mformService.getDateToStringFormat();
        //this.op.doc_name = 'новый документ*';
        if (this.op.doc_id === undefined) this.op.transactions = [{'j_ag1':0, 'j_ag2':0, 'j_ln_no':0}];
        this.op.binders = [];
        this.currentOperation.next(this.op);
    }

    searchOperation(term: string, trNo: string): Observable<Op[]> {
        let params = new URLSearchParams();
        params.set('docid', term);
        params.set('transno', trNo);
        let a = this.http
            .get(this.operationUrl, { search: params })
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
        this.op.doc_no = docNo;
        this.op.doc_date = docDate;
        //this.op.doc_name = docName;
        //this.op.fld_id = 257;
        //this.op.frm_id = 7;
        this.op.doc_done = '1';
        this.op.mc_id = 1;
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
        this.op.transactions = [{'j_ag1':0, 'j_ag2':0, 'j_ln_no':0}];
        this.op.binders = [];
        this.op.tml_id = null;
        this.trans.length = 0;
        this.currentOperation.next(this.op);
    }

    setOpTemplate(t: Templates){
        this.op.tml_id = t.id;
        this.op.doc_name = t.tmlName;
        //this.currentOperation.next(this.op);
    }

    setTrans3(trs: Transactions[]){
        this.trans = trs;
        //console.log(JSON.stringify(trs));
        //console.log('setTrans3 ' +JSON.stringify(this.trans));
    }

    fillQtyPrice(){
        var cells = Array.prototype.slice.call(document.getElementById("tblTransaction").getElementsByClassName("qps"));
        //for(var i in cells){ console.log("My contents is qty=\""+cells[i].innerHTML+"\""); }
        let j: number = 0;
        this.trans.forEach(element => {
            //console.log(cells[j].innerHTML, cells[j+1].innerHTML, cells[j+2].innerHTML);
            element.j_qty = cells[j].innerHTML;
            element.j_price = cells[j+1].innerHTML;
            element.j_sum = cells[j+2].innerHTML;
            element.j_ag1 = this.agToId;
            element.j_ag2 = this.agFromId;
            element.mc_id = 1;
            j += 3; 
        });
        //console.log('fillQtyPrice ' +JSON.stringify(this.trans));
        this.op.transactions.length = 0;
        this.op.transactions = this.trans;
        //console.log(JSON.stringify(this.op));
        this.currentOperation.next(this.op);
        // restore values in table grid qty, price, sum after save doc - some bag???
        j = 0;
        this.trans.forEach(element => {
            //console.log(cells[j].innerHTML, cells[j+1].innerHTML, cells[j+2].innerHTML);
            cells[j].innerHTML = element.j_qty;
            cells[j+1].innerHTML = element.j_price;
            cells[j+2].innerHTML = element.j_sum;
            j += 3;
        }); 
    }

    saveDoc(){
        console.log('['+JSON.stringify(this.op)+']');
        let a = this.http.post(this.addOperationUrl, '['+JSON.stringify(this.op)+']', this.options)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError)
        return a;
    }

    setTrans(trs: Transactions[]){
        var cells = Array.prototype.slice.call(document.getElementById("tblTransaction").getElementsByClassName("qps"));
        let j: number = 0;
        /* for(var i in cells){
            console.log("My contents is qty=\""+cells[i].innerHTML+"\"");
        } */
        console.log(JSON.stringify(trs));
        trs.forEach(element => {
            console.log(cells[j].innerHTML, cells[j+1].innerHTML, cells[j+2].innerHTML);
            element.j_qty = cells[j].innerHTML ? undefined : 0;
            element.j_price = cells[j+1].innerHTML ? undefined : 0;
            element.j_sum = cells[j+2].innerHTML ? undefined : 0;
        });
        this.trans = trs;
        //console.log(JSON.stringify(trs));
        this.op.transactions.length = 0;
        this.op.transactions.push(...this.trans);
        console.log('setTrans ' +JSON.stringify(this.op.transactions));
        console.log(JSON.stringify(this.op));
        this.currentOperation.next(this.op);
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

    private handleError(error: any){
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}