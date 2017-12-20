import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { DbRoles, firstLevelItem }  from '../../model/index';
import { SelectItem } from 'primeng/primeng';
import { GridOptions } from "ag-grid/main";
import { CheckComponent } from './admin-checkbox.component';
import {AppService} from '../../services/app.service';

@Component({
    selector: 'admin',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

    public ElementTypes: SelectItem[] = [];
    public selectedType: SelectItem;
    public things : firstLevelItem [] = [];
    public roleTmls : firstLevelItem [] = [];
    public test: any[]=[];
    public columnDefs: any;
    public rowData: any;
    public gridOptions: GridOptions;
    public isData: boolean = false;
    public isRequesting: boolean;
    public msgs: any[] = [];

    constructor(private adminService: AdminService, private appService: AppService,) {
        this.gridOptions = <GridOptions>{};
        this.gridOptions.columnDefs = [
            {headerName:"id", width:50, field: "id"},
            {headerName: "Название шаблона", width:500, field: "name", headerTooltip: "Название шаблона"},
            {cellRendererFramework: CheckComponent, width:70, field: "checked", 
                headerName: "Виден", colId: "isVisible",
                headerTooltip: "Пользователь видит документ с этим шаблоном"
            },
                //suppressMenu: true, suppressSorting: true,
                /*headerCellTemplate : `<div> <input id='select-all'
                type='checkbox'/><span>checked</span> </div>` */
            {cellRendererFramework: CheckComponent, width:100, field: "editable",
                headerName: "Созд/Редакт", colId: "isEditable", 
                headerTooltip: "Пользователь может создать/изменить документ с этим шаблоном"}
        ];
    }
    
    ngOnInit() {
        this.adminService.getDBRoles().subscribe(
            (val) => {                
                val.forEach(element => {
                    this.ElementTypes.push({label: element.name, value:{uid:element.uid}})
              });
              //this.selectedType = this.ElementTypes[33];
              //this.getDBRoleAccessParams(this.selectedType.value);
            }
        )
        this.appService.getSpinnerStatus().subscribe(
            (v) => {this.isRequesting = v;}
        )
    }

    onChange(e: any) {
        this.getDBRoleAccessParams(e.value);
        //console.log(a.uid);
    }

    setDBRoleAccessParams() {}

    getDBRoleAccessParams(e: any) {
        this.things.length = 0;
        this.things = this.adminService.getAccessParams(e.uid);
        this.adminService.getRoleTemplates(e.uid)
            .then(data => {this.roleTmls = data;
                if (this.roleTmls.concat.length != null) this.isData = true;
            })
        /*  for(var i: number = 0; i < 7; i++) {
            this.things[i] = [];
            for(var j: number = 0; j< 10; j++) {
                this.things[i][j] = new firstLevelItem(j, 'item '+j, true);
            }
        } */
    }

    saveRootFoldersAccessConfig(tabId: number) {
        this.adminService.saveRootFoldersAccessConfig(tabId, this.things[tabId], this.selectedType);
    }

    saveCheckedTmls() {
        let a, b: any;
        a = this.roleTmls;
        b = a.filter(ar => ar.checked === true);
        this.adminService.saveCheckedTmls(b, this.selectedType)
            .then(data => { this.msgs = [];
                this.msgs.push({severity:'success', summary:'Операция сохранения', detail:'кофигурация доступа - сохранена'});
            }
        );
    }

    clickTest() {
        console.log('www');
        this.adminService.getTest().subscribe(
            (v) => {this.test = v}
        )
    }

    saveAccConfig() {
        //console.log(JSON.stringify(this.things[6]));
    }

    onGridReady(params) {
        params.api.sizeColumnsToFit();
    }

    onCheckBoxTml() {
        let a, b: any;
        a = this.things[6];
        b = a.filter(ar => ar.checked === true);
        this.adminService.refreshListTemplates(b, this.selectedType)
            .then(data => this.roleTmls = data);
    }
}
