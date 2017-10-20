import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Entities, Transactions } from '../../../model';
import { SelectItem } from 'primeng/primeng';
import * as _ from 'lodash';

@Component({
  selector: 'table-entity',
  templateUrl: './table-entity.component.html',
  styleUrls: ['./table-entity.component.css']
})
export class TableEntityComponent implements OnInit{

    //@Input('docTransactionsIn') entities: Transactions[] = [];
    //@Input() entities: Transactions[];

    entities: Transactions[]=[];
    selectedType: string;
    types: SelectItem[];
    myValue: any = '';
    selectedRowNo: number = -1;

    constructor() {
        this.types = [];
        this.types.push({label:'Название ОУ', value:'name'});
        this.types.push({label:'Nom №', value:'nom'});
        this.types.push({label:'ID', value:'id'});
        this.selectedType = this.types[1].value;
    }

    ngOnInit(){ }

    private sortByWordLength = (a:any) => { return a.name.length; }
    
    public removeItem(item: any) {
        this.entities = _.filter(this.entities, (elem)=>elem!=item);
        //console.log("Remove: ", item.id);
    }

    setTransactions(t: Transactions[]){ this.entities = t; }

    onGetItem(p: Entities){
        let entity = [...this.entities];
        if (this.selectedRowNo == -1) {
            entity.push(p);

        } else {
            entity[this.selectedRowNo] = p;
            this.selectedRowNo = -1;
        }
        this.entities = entity;
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
