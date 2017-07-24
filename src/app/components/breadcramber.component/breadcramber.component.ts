import { Component, OnInit} from '@angular/core';
import { AppService } from '../../services/app.service';
import { BreadCramber, Folder } from '../../model/index';

@Component({
    moduleId: module.id,
    selector: 'breadcramber',
    templateUrl: 'breadcramber.component.html',
    styleUrls:  ['breadcramber.component.css'],
})

export class BreadCramberComponent implements OnInit {

    private bcrambList: BreadCramber[] = [];
    private currentTypeSelector: string;
    private error: any

    constructor(private appService: AppService) { }

    ngOnInit() {
        this.appService.bcramberChange$.subscribe(
            (v) => {this.bcrambList = v}
        )
        this.appService.getTypeSelector().subscribe(
            (v) => {this.currentTypeSelector = v})
    }

    onClickBCramb(bcramb: BreadCramber){
        //removing selected item from bcramb array
        let index: number = this.bcrambList.indexOf(bcramb, 0);
        let size: number = this.bcrambList.length;
        if (index > -1) {
            this.bcrambList.splice(index, size);
        }
        //this.appService.setCurfld(String(bcramb.rootId));
        //console.log('this.typeSelector '+ this.typeSelector);
        this.appService.setCurrentFolder(new Folder(bcramb.rootId, bcramb.name, true, 0, this.currentTypeSelector, 0));
        this.appService.searchFolder();
        //console.log(String(bcramb.id));
        //this.appService.searchFolderObserver("0").subscribe((val) => {this.error = val});;
    }

    clearBCramb(){this.bcrambList.length = 0;}
}