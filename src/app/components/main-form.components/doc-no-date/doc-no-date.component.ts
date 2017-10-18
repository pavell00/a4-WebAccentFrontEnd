import { Component, OnInit, Input } from '@angular/core';
//import { MainformService } from '../../../services/main-form.service';
import { OperationService } from '../../../services/operation.service';

@Component({
  selector: 'doc-no-date',
  templateUrl: './doc-no-date.component.html',
  styleUrls: ['./doc-no-date.component.css']
})
export class DocNoDateComponent implements OnInit {

  //@Input('docNoIn') docNo: string;
  //@Input('docNameIn') docName: string;
  //@Input('docDateIn') docDate: string;
  docNo: string;
  docName: string;
  docDate: string;

  @Input() isNewOp: string;

  constructor(private operationService: OperationService) { }

  ngOnInit() {
    this.operationService.getCurrentOperation().subscribe(
      (v) => {this.docNo = v.doc_no;
              this.docName = v.doc_name;
              this.docDate = v.doc_date;
        }
    )
  }

  setDn(e: any) {
    console.log(e);
  }

}
