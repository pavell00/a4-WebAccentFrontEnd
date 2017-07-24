import { Component, OnInit } from '@angular/core';

import { Document } from '../../model/index';
import {AppService} from '../../services/app.service';
import {Subject} from 'rxjs/Subject';

@Component({
    moduleId: module.id,
    selector: 'document',
    templateUrl: 'document.component.html'
})

export class DocumentComponent implements OnInit {

    private displayDialog: boolean;
    private document: Document;
    private documentIsNew: boolean;

    private documentSource: Subject<Document> = new Subject<Document>();
    private documentSelect$ = this.documentSource.asObservable();

    private selectedRow: Document;
    private docs: Document[];
    private error: any;
    private counter: number = 0;
    private docLazy: Document[];

    constructor(private appService: AppService) { }

    ngOnInit() {
        //this.getAll();
        //this.getAll2();
    }

    getAll(){
        //console.log('documents.component-getAll(this.appService.getDocs().subscribe)')
         this.appService.getDocs().subscribe(
            (val) => {this.docs = val;
                    this.counter = this.docs.length;}) 

        this.documentSelect$.subscribe(
            (v) => {this.document = v;}
        )
    }

    getAll2(){
        this.appService.searchDocs2().subscribe(
            (val) => {console.log(JSON.stringify(val))})
    }

    onRowSelect(event: any){
      //this.selectedDocument = event.data;
      this.documentSource.next(this.selectedRow);
      this.appService.searchJournal(String(this.selectedRow.id))
    }

    onDeleteDoc(event: any){
        //this.docs.splice(this.findSelectedDocIndex(), 1);
        //console.log(JSON.stringify(this.selectedRow))
        if (this.selectedRow != undefined) {
            this.appService.delDoc(String(this.selectedRow.id)).subscribe(
                v => {this.getAll();
                      return true}
            )
        }
    }

    onGetDocs(a: any){
        //console.log(this.documents.documentsOfFooler);
        //this.docs = this.documents.documentsOfFooler;
        //console.log(a);
        this.getAll();
    }

    rowStyle(rowData: any, rowIndex: number): string {
        return rowData.docDone == 2 ? 'green-row-class' : 'red-row-class';
    }

    onDCC(event: any){
        console.log('onDCC()');
    }

    loadDocsLazy(event: any) {
        //console.log(event.first, event.rows );
        //in a real application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort with
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
        if(this.docs) {
            this.docLazy = this.docs.slice(event.first, (event.first + event.rows));
        }
    }

    mysort(event: any){
        console.log(event.field, event.order);
    }
}