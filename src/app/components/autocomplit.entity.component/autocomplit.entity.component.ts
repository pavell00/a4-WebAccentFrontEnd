import { Component, OnInit } from '@angular/core';
import { Entities } from '../../model';
import {AppService} from '../../services/app.service';

//import {} from 'rxjs'

@Component({
    moduleId: module.id,
    selector: 'entity',
    templateUrl: 'autocomplit.entity.component.html'
})
export class AutoComplitEntityComponent implements OnInit {

    val: Entities;
    results: Entities[];
    selectedRow: Entities;

    constructor(private appService: AppService) { }

    ngOnInit() { }

    search(event :any) {
        let query = event.query;        
        this.appService.searchEntity(query).subscribe(
                (v) => {this.results = v;}
            )
    }

    getData(event: any){
        //console.log(event.entId);
        this.selectedRow = event;
        //console.log(this.selectedRow.entId);
    }

}