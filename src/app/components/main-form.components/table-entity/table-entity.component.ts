import { Component, OnInit, ViewChild} from '@angular/core';
import { Entities, Transactions, Op } from '../../../model';
import { OperationService } from '../../../services/operation.service';
import { SelectItem } from 'primeng/primeng';
import * as _ from 'lodash';

@Component({
  selector: 'table-entity',
  templateUrl: './table-entity.component.html',
  styleUrls: ['./table-entity.component.css']
})
export class TableEntityComponent implements OnInit{

    private op: Op;
    private trans: Transactions[]=[];
    private selectedType: string;
    private types: SelectItem[];
    private myValue: any = '';


    constructor(private operationService: OperationService) {
        this.types = [];
        this.types.push({label:'Название ОУ', value:'name'});
        this.types.push({label:'Nom №', value:'nom'});
        this.types.push({label:'ID', value:'id'});
        this.selectedType = this.types[1].value;
    }

    ngOnInit(){
        this.operationService.getCurrentOperation().subscribe(
            (v) => {this.trans = v.transactions;
                    this.op = v;}
        )
    }

    private sortByWordLength = (a:any) => { return a.name.length; }
    
    public removeItem(item: any) {
        this.trans = _.filter(this.trans, (elem)=>elem!=item);
        let rowNo: number = 0;
        this.trans.forEach(element => {
            element.j_ln_no = rowNo;
            rowNo += 1;
        });
        this.operationService.setTrans3(this.trans);
        //console.log(JSON.stringify(this.trans));
    }
    
    onKeyPress(e:any, t:Transactions, type: string) {
//        console.log('cell row '+ t.j_ln_no, 'cell value '+e.target.innerHTML);
/*         switch (type) {
            case 'qty':
                //this.trans[t.j_ln_no].j_qty = e.target.innerHTML;
                if (t.j_price != undefined) {this.trans[t.j_ln_no].j_sum = t.j_qty * t.j_price;}
                break;
            case 'prc':
                //this.trans[t.j_ln_no].j_price = e.target.innerHTML;
                //console.log('prc');
                if (this.trans[t.j_ln_no].j_qty != undefined) {this.trans[t.j_ln_no].j_sum = this.trans[t.j_ln_no].j_qty * this.trans[t.j_ln_no].j_price;}
                break;
            case 'sum':
                //this.trans[t.j_ln_no].j_sum = e.target.innerHTML;
                if (t.j_sum != undefined) {this.trans[t.j_ln_no].j_price = t.j_sum / t.j_qty;}
                break;                
            default:
                break;
        } */
        //console.log(e.target.vlue);
    }

    getTrans(){
        console.log('getTrans ' +JSON.stringify(this.trans));
        return this.trans;
    }

    onGetItem(p: Entities){
        let trs = [...this.trans];
        let tr: Transactions = {};
        tr.entName = p.entName;
        tr.entNom = p.entNom;
        tr.j_ent = p.id
        tr.j_qty = p.entQty;
        tr.j_ln_no = trs.length;
        tr.j_tr_no = 0;
        tr.j_date = this.op.doc_date;
        tr.j_done = 0;
        trs.push(tr);
        this.trans = trs;
        this.operationService.setTrans3(this.trans);
        //console.log('onGetItem ' +JSON.stringify(this.trans));
        switch (this.selectedType) {
            case 'ent_nom':
                this.myValue = p.entNom
                break;
            case 'ent_name':
                this.myValue = p.entName
                break;
            default:
                this.myValue = p.entName
                break;
        }
    }

    onGridReady(params) {
        params.api.sizeColumnsToFit();
    }
}
