import { Component, OnInit } from '@angular/core';
import { OperationShortView, Binders, Op, TransactionShortView } from '../../model';
import {AppService} from '../../services/app.service';

@Component({
    selector: 'operation-info',
    templateUrl: './operation-info.component.html',
    styleUrls: ['./operation-info.component.css']
})

export class OperationInfoComponent implements OnInit {

    private operationInfo: OperationShortView;
    private binders: Binders[];
    private links: Op[];
    private translist: TransactionShortView[];
    private isExists: boolean = false;

    constructor(private appService: AppService) { }

    ngOnInit() {
        this.appService.getOperationIfo().subscribe(
            (val) => {let a: string = JSON.stringify(val); 
                let b: string = a.substr(1, a.length-2);
                let jsonObj: any = JSON.parse(b); // string to generic object first
                this.operationInfo = <OperationShortView> jsonObj;
                this.binders = this.operationInfo.binders;
                this.links = this.operationInfo.links;
                this.translist = this.operationInfo.trnasList;
                this.isExists = true;
            })
    }


}
