import { Component, OnInit } from '@angular/core';
import {AppService} from '../../services/app.service';
import {BreadCramber} from '../../model/breadcramber'

@Component({
  moduleId: module.id,
  selector: 'root-app',
  templateUrl: 'root.component.html',
  styleUrls:  ['root.component.css'],
})

export class RootComponent implements OnInit { 

    private startDate: string;
    private endDate: string;
    private checked: boolean = true;
    private error: any;


    constructor(private appService: AppService){ }

    ngOnInit(){
       /*this.appService.getCounter().subscribe(
            (v) => {this.counter = v;}
        )*/
        this.appService.getCalendarSartDt().subscribe(
            (v) => {this.startDate = v;}
        )
        this.appService.getCalendarEndDt().subscribe(
            (v) => {this.endDate = v;}
        )        
    }        
    
}