import { Component, OnInit } from '@angular/core';
import { OperationShortView } from '../../model';
import {AppService} from '../../services/app.service';

@Component({
    selector: 'operation-info',
    templateUrl: './operation-info.component.html',
    styleUrls: ['./operation-info.component.css']
})

export class OperationInfoComponent implements OnInit {

    private operationInfo: OperationShortView;

    constructor(private appService: AppService) { }

    ngOnInit() {
        this.appService.getOperationIfo().subscribe(
            (val) => {this.operationInfo = val;console.log(JSON.stringify(val))})
    }

}
