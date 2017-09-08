import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Document, Folder } from '../../model/index';
import { AppService } from '../../services/app.service';
import { MainformService } from '../../services/main-form.service';

@Component({
    moduleId: module.id,
    selector: 'editDialog',
    templateUrl: 'edit.dialog.component.html',
      styleUrls: ['edit.dialog.component.css']
})
export class EditDialogComponent implements OnInit {

    @Input() document: Document;

    displayDialog: boolean;
    private docIsNew: boolean;
    //private tmlId: number;
    private tmlName: string;

    @Output() addDocEvent: EventEmitter<Document> = new EventEmitter();

    constructor(private appService: AppService,
                private mfService: MainformService) { }

    ngOnInit() {
        this.mfService.getCurTemplate().subscribe(
            (res) => { if (res != undefined) this.tmlName = res.tmlName; }
        )
    }

    getAll(){
        this.appService.searchDocs2().subscribe(
            (val) => {this.addDocEvent.emit(this.document);
                      //console.log(JSON.stringify(val))
                     })
    }

    onOpenDlg(e: number){
        ///let tml = this.mfService.getCurTemplate();
        //this.tmlName = tml.tmlName;
        if (e === 1) { // open exist document
            this.docIsNew = false;
            this.displayDialog = true;
        } else { // open new document
            this.docIsNew = true;
            let docName = this.appService.getCurrentFolder().name;
            this.document = new Document(1, docName, this.mfService.getDateToStringFormat(),0,0,'',0);
            this.displayDialog = true;
        }
        //this.tmlId = this.appService.getCurrentFolder().tmlId;
        //this.tmlName = this.mfService.getCurTemplate()
        //console.log('onOpenDlg() ' + JSON.stringify(this.mfService.getCurTemplate()));
    }

    close(){this.displayDialog = false}

    save(){
        if (this.docIsNew) {
            let a = this.appService.saveDoc(this.document).subscribe(
                v => {this.getAll();},
                err => {console.log('error')}
            )
        } else {
            let a = this.appService.updateDocPromise(this.document);
        }
        this.displayDialog = false;
    }
}