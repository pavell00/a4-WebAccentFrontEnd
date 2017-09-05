import { Component, OnInit, ViewChild,
        OnChanges, SimpleChanges, EventEmitter,
        Input, Output } from '@angular/core';
import { Logger } from "angular2-logger/core";        
import { MenuItem } from 'primeng/primeng';
import { TemplateSelectorComponent} from '../template-selector/template-selector.component';
import { TableEntityComponent } from '../table-entity/table-entity.component';
import { AgentSelectorComponent, BinderSelectorComponent } from '../index';
import { MainformService } from '../../../services/main-form.service';
import { Operation, Binders, Agents, 
        Templates, Entities } from '../../../model';

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
    @Input() curentdoc: Document;
    @Input() fldTmlId: number;

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

    @Output() closeDocEvent: EventEmitter<string> = new EventEmitter();

    constructor(private mfService: MainformService,
                private _logger: Logger) { }

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes){
            let change = changes[propName];
            if (propName === 'curentdoc') {
                this.fillCurentDocData(change.currentValue);
            }
            if (propName === 'fldTmlId') {
                this.fillCurentfldTmlIdData(change.currentValue);
            }
        }
    }

    fillCurentDocData(e: any){
        if (e != undefined) {
            this.outBinders.length = 0; //clear array
            let obj = e;
            //operation not new
            if (obj.id != 0) {
                this.mfService.searchOperation(obj.id).subscribe(
                    (v) => {this.operation = v;
                            this.outDocNo = this.operation[0].doc_no;
                            this.outDocName = this.operation[0].doc_name;
                            this.outDocDate = this.operation[0].doc_date;
                            this.outTemplateId = this.operation[0].tml_id;
                            let o = this.operation[0].binders;
                            for (var key in o) {
                                if (o.hasOwnProperty(key)) {
                                    var element = o[key];
                                    this.outBinders.push(element);
                                }
                            }
                            //select Agent from zero lines first transaction
                            this.mfService.searchAgentPromise('ID', '', this.operation[0].transactions[0].j_ag1)
                                .then(data => { this.AgTo = data[0];
                                                this.asc.setAgents(this.AgTo, 'AgTo');})
                                .catch(error => this._logger.error(error));
                            this.mfService.searchAgentPromise('ID', '', this.operation[0].transactions[0].j_ag2)
                                .then(data => { this.AgFrom = data[0];
                                                this.asc.setAgents(this.AgFrom, 'AgFrom');})
                                .catch(error => this._logger.error(error));
                        }
                )
            } else { // operation is new
                this.outDocNo = obj.docNo;
                this.outDocName = obj.docName;
                this.outDocDate = obj.docDate
                this.asc.setAgents({}, 'AgTo');
                this.asc.setAgents({}, 'AgFrom');
                this.tec.clearEntities();
                if (this.fldTmlId != 0) {
                    this.outTemplateId = this.fldTmlId; //set default temlate linked to folder
                }
            }
        }
    }

    fillCurentfldTmlIdData(e: any){
        //console.log(e);
        if (e != undefined) { }
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Новый',
                icon: 'fa-file-o',
                //routerLink: ['change'],
                command: () => this.test('New')
            }, {
                label: 'Сохранить',
                icon: 'fa-floppy-o',
                disabled: true
            }, {
                label: 'Закрыть',
                icon: 'fa-times',
                command: () => {this.closeDocEvent.emit('closeDoc'); this.test('any');}
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

    test(e: any){
        //console.log('command! ', e);
    }

}