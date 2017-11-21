import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Templates } from '../../../model/template';
import { MainformService } from '../../../services/main-form.service';
import { OperationService } from '../../../services/operation.service';
import { Logger } from "angular2-logger/core";

@Component({
    selector: 'template-selector',
    templateUrl: './template-selector.component.html',
    styleUrls: ['./template-selector.component.css']
})
export class TemplateSelectorComponent implements OnInit {

    //@Input('docTemplateIn') docTemplateId: number;
    private docTemplateId: number;
    private displayDialog: boolean;
    private linkTemplates: Templates[] = [];
    private selectedTemplate: Templates;
    private index: number = 0;

    constructor(private mformService: MainformService,
                private operationService: OperationService,
                private _logger: Logger) { }

    ngOnInit() {
        this.mformService.getCurTemplate().subscribe(
          (res) => { if (res != undefined) this.docTemplateId = res.id; }
        )
    }

    searchTemplate(tmlid: string, mode: string) {
        this.mformService.searchTemplate(tmlid, mode).subscribe(
            (v) => {this.linkTemplates = v;
                    if (this.docTemplateId != undefined){
                        let i: number = 0;
                        for (let tml of this.linkTemplates){
                            if (tml.id === this.docTemplateId) {
                                this.index = i;
                                this.selectedTemplate = tml;
                                break;
                            }
                          ++i;
                        }
                    }
                  },
            (error) => this._logger.error(error),
            () => true
        )
    }

    ShowDialogTemplateSelector(){
        this.searchTemplate(String(this.docTemplateId), '0'); //select all linked tmplates
        this.displayDialog = true;
    }

    onCloseSelectTml(){
        this.displayDialog = false;
        this.docTemplateId = this.selectedTemplate.id;
        this.mformService.setCurTemplate(this.selectedTemplate.id);
        this.operationService.setOpTemplate(this.selectedTemplate)
    }

    onSelect(a: Templates, i: number){
        this.selectedTemplate = a;
        this.index = i;
    }
}