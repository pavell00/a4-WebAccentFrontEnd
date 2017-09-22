import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Entities, Transactions } from '../../../model';
import { SelectItem } from 'primeng/primeng';
import * as _ from 'lodash';

@Component({
  selector: 'table-entity',
  templateUrl: './table-entity.component.html',
  //styleUrls: ['./table-entity.component.css']
})
export class TableEntityComponent implements OnInit{

    @Input('docTransactionsIn') entities: Transactions[];

    selectedType: string;
    types: SelectItem[];
    myValue: any = '';
    selectedRowNo: number = -1;

    constructor() {
        this.types = [];
        this.types.push({label:'Название ОУ', value:'name'});
        this.types.push({label:'Nom №', value:'nom'});
        this.types.push({label:'ID', value:'id'});
        this.selectedType = this.types[0].value;
    }

    ngOnInit(){ }
    private sortByWordLength = (a:any) => {
        return a.name.length;
      }
    
    public removeItem(item: any) {
      this.entities = _.filter(this.entities, (elem)=>elem!=item);
      console.log("Remove: ", item.email);
      }

    clearEntities(){
        let entity = [...this.entities];
        entity.length = 0;
        this.entities = entity;
    }

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

    onRowEdit(ri: number, rd: any){
        //console.log(ri, rd);
        this.selectedRowNo = ri;
        let entity = this.entities[ri];
        switch (this.selectedType) {
        case 'ent_nom':
            this.myValue = entity.entNom
            break;
        case 'ent_name':
            this.myValue = entity.entName
            break;
        default:
            this.myValue = entity.entName
            break;
        }
    }

    deleteRow(e: any, ri:any){
        //console.log(ri);
        //let index = this.entities.indexOf(ri);
        //console.log(this.entities.length);
        this.entities = this.entities.filter((val, i) => i!=ri);
        //this.entities.splice(index, 1);
        //console.log(this.entities.length);
    }

    addRow(){
        let entity = [...this.entities];
        let b = new Entities();
        /* b.firstName = "Tommy";
            b.lastName = "lie";
            b.age = 50;*/
        entity.push(b);
        this.entities = entity;
    }

    onRowClick(e: any){
        //console.log(e);
        //console.log(this.selectedRow);
    }

    onEditInit(e: any){
        //console.log(e.data);
        //console.log(e.column);
    }

    onEdit(e: any) {
        //console.log(e.originalEvent);
        //console.log(e.data);
        //console.log(e.index);
    }

    onEditComplete(e: any){
        /*console.log(e.column);
        console.log(e.data;
        console.log(e.index);*/
    }

    onClick(ri: number){
        console.log('ri= '+ri);
    }

    onGridReady(params) {
        params.api.sizeColumnsToFit();
    }
}
