import { Component, OnInit } from '@angular/core';
import { OperationShortView, Binders, Op, TransactionShortView } from '../../model';
import {AppService} from '../../services/app.service';

@Component({
    selector: 'operation-info',
    templateUrl: './operation-info.component.html',
    styleUrls: ['./operation-info.component.css']
})

export class OperationInfoComponent implements OnInit {

    private operationInfo: OperationShortView[];
    private binders: Binders[];
    private links: Op[];
    private translist: TransactionShortView[];
    private isExists: boolean = false;

    constructor(private appService: AppService) { }

    ngOnInit() {
        this.appService.getOperationIfo().subscribe(
            (val) => {this.operationInfo = val;
                this.binders = val[0].binders;
                this.links = val[0].links;
                this.translist = val[0].trnasList;
                this.isExists = true;
                //console.log(JSON.stringify(val));
            })
    }


}
