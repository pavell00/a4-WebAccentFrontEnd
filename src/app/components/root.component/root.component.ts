import { Component, OnInit } from '@angular/core';
import {AppService} from '../../services/app.service';
import {BreadCramber, Op} from '../../model';
import { OperationService } from '../../services/operation.service';

@Component({
  //moduleId: module.id,
  selector: 'root-app',
  templateUrl: './root.component.html',
  styleUrls:  ['./root.component.css'],
})

export class RootComponent implements OnInit { 

    private startDate: string;
    private endDate: string;
    private checked: boolean = true;
    private error: any;
    curOp: Op;

    constructor(private appService: AppService,
                private operationService : OperationService){ }

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
        this.operationService.getCurrentOperation().subscribe(
            (v) => {this.curOp = v;}
        )
    }
}