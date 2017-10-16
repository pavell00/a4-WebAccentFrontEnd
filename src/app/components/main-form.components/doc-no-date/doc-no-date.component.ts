import { Component, OnInit, Input } from '@angular/core';
import { MainformService } from '../../../services/main-form.service';
import { OperationService } from '../../../services/operation.service';

@Component({
  selector: 'doc-no-date',
  templateUrl: './doc-no-date.component.html',
  styleUrls: ['./doc-no-date.component.css']
})
export class DocNoDateComponent implements OnInit {

  @Input('docNoIn') docNo: string;
  @Input('docNameIn') docName: string;
  @Input('docDateIn') docDate: string;


  constructor(private mfService: MainformService,
              private operationService : OperationService) { }

  ngOnInit() {
    //this.docDate = this.mfService.getDateToStringFormat();
    /*     this.mfService.getOperation().subscribe(
      (v) => {this.docNo = v.doc_no;
              this.docName = v.doc_name;
            console.log(v.doc_no, v.doc_name)}
    ) */
  }

  onClick(){
    //console.log(this.docNo);
    this.operationService.setDocNo(this.docNo);
    this.operationService.setDocDate(this.docDate);
    this.operationService.setDocName(this.docName);
  }

  setDn(e: any){
    console.log(e);
  }

}
