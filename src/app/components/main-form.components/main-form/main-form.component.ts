import { Component, OnInit, ViewChild,
        OnChanges, SimpleChanges, EventEmitter,
        Input, Output } from '@angular/core';
import { Logger } from "angular2-logger/core";        
import { MenuItem } from 'primeng/primeng';
import { AgentSelectorComponent, BinderSelectorComponent, 
        TableEntityComponent, TemplateSelectorComponent, DocNoDateComponent } from '../';
import { MainformService } from '../../../services/main-form.service';
import { OperationService } from '../../../services/operation.service';
import { Operation, Binders, Agents, 
        Templates, Entities, Transactions } from '../../../model';

@Component({
    selector: 'main-form',
    templateUrl: './main-form.component.html',
    styleUrls: ['./main-form.component.css']
})
export class MainFormComponent implements OnInit, OnChanges {

    @ViewChild(BinderSelectorComponent) private bsc: BinderSelectorComponent;
    @ViewChild(TemplateSelectorComponent) private tsc: TemplateSelectorComponent;
    @ViewChild(AgentSelectorComponent) private asc: AgentSelectorComponent;
    @ViewChild(TableEntityComponent) private tec: TableEntityComponent;
    @ViewChild(DocNoDateComponent) private docnodate: DocNoDateComponent;
    @Input() curentdoc: Document;

    private operation: Operation[] = []; // не работет без фиктивного массива ???
    private items: MenuItem[];
    private outDocNo: string;
    private outDocName: string;
    private outDocDate: string;
    private outBinders: Binders[] = [];
    private outTemplateId: number;
    private AgTo: Agents = {};
    private AgFrom: Agents = {};
    private testAgent: any;
    private curentTemlate: Templates = {};
    private transactions: Transactions[] = [];
    private isNewOp : boolean = false;

    @Output() closeDocEvent: EventEmitter<string> = new EventEmitter();

    constructor(private mformService: MainformService,
                private operationService: OperationService,
                private _logger: Logger) { }

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes){
            let change = changes[propName];
            if (propName === 'curentdoc') {
                this.fillCurentDocData(change.currentValue);
            }
            if (propName === 'fldTmlId') {
                //this.fillCurentfldTmlIdData(change.currentValue);
            }
        }
    }

    fillCurentDocData(e: any){
        this.outBinders.length = 0; //clear array
        this.transactions.length = 0; //clear array
        if (e != undefined) {
            let obj = e;
            //operation not new
            if (obj.id != 0) {
                this.operationService.searchOperation(obj.id, '0').subscribe(
                    (v) => {this.isNewOp = false;
                            this.operation = v;
                            this.outDocNo = this.operation[0].doc_no;
                            this.outDocName = this.operation[0].doc_name;
                            this.outDocDate = this.operation[0].doc_date;
                            this.outTemplateId = this.operation[0].tml_id;
                            this.mformService.setCurTemplate(this.operation[0].tml_id);
                            let t = this.operation[0].transactions;
                            for (var key in t) {
                                if (t.hasOwnProperty(key)) {
                                    var tr = t[key];
                                    this.transactions.push(tr);
                                }
                            }
                            this.tec.setTransactions(this.transactions);//fill transactionsl data to dialog of document
                            let b = this.operation[0].binders;
                            for (var key in b) {
                                if (b.hasOwnProperty(key)) {
                                    var element = b[key];
                                    this.outBinders.push(element);
                                }
                            }
                            //select Agent from zero lines first transaction
                            if (this.operation[0].transactions[0].j_ag1 != undefined) {
                                this.mformService.searchAgentPromise('ID', '', this.operation[0].transactions[0].j_ag1)
                                    .then(data => { this.AgTo = data[0];
                                                    this.asc.setAgents(this.AgTo, 'AgTo');})
                                    .catch(error => this._logger.error(error));
                            }
                            if (this.operation[0].transactions[0].j_ag2 != undefined) {
                                this.mformService.searchAgentPromise('ID', '', this.operation[0].transactions[0].j_ag2)
                                    .then(data => { this.AgFrom = data[0];
                                                    this.asc.setAgents(this.AgFrom, 'AgFrom');})
                                    .catch(error => this._logger.error(error));
                            }
                        }
                )
            } else { // operation is new
                this.isNewOp = true;
                //this.outDocNo = "";//obj.docNo;
                //this.docnodate.clearDocNo();
                //this.outDocName = obj.docName;
                //this.outDocDate = this.mformService.getDateToStringFormat();
                this.asc.setAgents({}, 'AgTo');
                this.asc.setAgents({}, 'AgFrom');
                this.tec.setTransactions([]);//clear transactionsl data to dialog of document
                this.mformService.getCurTemplate().toPromise().then(response => { 
                    if (response != undefined) this.outTemplateId = response.id; //set default temlate linked to folder
                });

            }
        }
    }

    fillCurentfldTmlIdData(tml: any){
        /*console.log(tml);
         if (tml != undefined && tml != 0) {
            this.mformService.searchTemplate(tml, '1').subscribe(
                (v) => {this.curentTemlate = v[0]},
                (error) => this._logger.error(error),
                () => true
            )
        } */
    }

    ngOnInit(){
        this.items = [
            {
                label: 'Новый',
                icon: 'fa-file-o',
                //routerLink: ['change'],
                command: () => this.test('New')
            }, {
                label: 'Сохранить',
                icon: 'fa-floppy-o',
                //disabled: true
                command: () => this.onSave()
            }, {
                label: 'Закрыть',
                icon: 'fa-times',
                command: () => {this.closeDocEvent.emit('closeDoc'); 
                                this.operationService.clearOp();
                    }
            }, {
                label: 'Печать',
                icon: 'fa-print',
                items: [
                        {label: 'Печать в PDF',
                            icon: 'fa-file-pdf-o',
                            command: () => this.test('Печать в PDF')},
                        {label: 'Накладная ДНР',
                            icon: 'fa-print',
                            command: () => this.test('Накладная ДНР')},
                        ]
            }, {
                label: 'Проводки',
                icon: 'fa-list-ol',
                command: () => this.test('Проводки')
            }, {
                label: 'Шаблоны',
                icon: 'fa-clipboard',
                command: () => this.tsc.ShowDialogTemplateSelector()
            }, {
                label: 'Связи',
                icon: 'fa-link',
                command: () => this.test('Связанные')
            }, {
                label: 'Подшивки',
                icon: 'fa-thumb-tack',
                items: [
                        {label: 'Добавить',
                            icon: 'fa-plus-circle',
                            command: () => this.bsc.addBinders()},
                        {label: 'Удалить',
                            icon: 'fa-minus-circle',
                            command: () => this.bsc.ShowDialogDelBinder()},
                        ]
            }];
    }

    onSave(){
        this.operationService.setDocNo(this.docnodate.docNo);
        this.operationService.setDocDate(this.docnodate.docDate);
        this.operationService.setDocName(this.docnodate.docName);
    }

    test(e: any){
        //console.log('command! ', e);
    }

}