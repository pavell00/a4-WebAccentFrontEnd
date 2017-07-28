import { Component, OnInit, ViewChild } from '@angular/core';
import { Entities } from '../../../model';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'table-entity',
  templateUrl: './table-entity.component.html',
  styleUrls: ['./table-entity.component.css']
})
export class TableEntityComponent implements OnInit{

  entities: Entities[]=[];
  selectedType: string;
  types: SelectItem[];
  myValue: any = '';
  selectedRowNo: number = -1;

  constructor() {
    this.types = [];
    this.types.push({label:'Название ОУ', value:'ent_name'});
    this.types.push({label:'Nom №', value:'ent_nom'});
    this.types.push({label:'ID', value:'ent_id'});
    this.selectedType = this.types[0].value;
  }

  ngOnInit(){ }

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
          this.myValue = p.ent_nom
          break;
        case 'ent_name':
            this.myValue = p.ent_name
            break;
        default:
          this.myValue = p.ent_name
          break;
    }
  }

  onRowEdit(ri: number, rd: any){
    //console.log(ri, rd);
    this.selectedRowNo = ri;
    let entity = this.entities[ri];
    switch (this.selectedType) {
      case 'ent_nom':
        this.myValue = entity.ent_nom
        break;
      case 'ent_name':
          this.myValue = entity.ent_name
          break;
      default:
        this.myValue = entity.ent_name
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

  
}
