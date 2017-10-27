import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Document, Folder } from '../../model/index';
import { AppService } from '../../services/app.service';
import { MainformService } from '../../services/main-form.service';
import { OperationService } from '../../services/operation.service';

@Component({
    selector: 'editDialog2',
    templateUrl: './edit-dialog2.component.html',
    styleUrls: ['./edit-dialog2.component.css']
})
export class EditDialog2Component implements OnInit {

    @Input() document: Document;

    displayDialog: boolean;
    private docIsNew: boolean;
    //private tmlId: number;
    private tmlName: string;
    visible = 'none';

    @Output() addDocEvent: EventEmitter<Document> = new EventEmitter();

    constructor(private appService: AppService,
        private mfService: MainformService,
        private operationService: OperationService,) { }

    ngOnInit() {
        this.mfService.getCurTemplate().subscribe(
            (res) => { if (res != undefined) this.tmlName = res.tmlName}
        )
    }

    getAll() {
        this.appService.searchDocs2().subscribe(
            (val) => { this.addDocEvent.emit(this.document); }
        )
    }

    onOpenDlg(e: number) {
        if (e === 1) { // open exist document
            this.docIsNew = false;
            //this.displayDialog = true;
            this.visible = 'block';
        } else { // open new document
            this.docIsNew = true;
            let docName = this.appService.getCurrentFolder().name;
            this.document = new Document(1, docName, this.mfService.getDateToStringFormat(), 0, 0, '', 0);
            //this.displayDialog = true;
            this.visible = 'block';
        }
    }

    onClose() { this.visible = 'none' }
    close() { this.displayDialog = false }

/*     save() {
        if (this.docIsNew) {
            let a = this.appService.saveDoc(this.document).subscribe(
                v => { this.getAll(); },
                err => { console.log('error') }
            )
        } else {
            let a = this.appService.updateDocPromise(this.document);
        }
        this.displayDialog = false;
    } */


}
