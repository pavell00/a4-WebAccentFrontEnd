import { Component, OnInit, Input } from '@angular/core';
import { MainformService } from '../../../services/main-form.service';

@Component({
  selector: 'doc-no-date',
  templateUrl: './doc-no-date.component.html',
  styleUrls: ['./doc-no-date.component.css']
})
export class DocNoDateComponent implements OnInit {

  @Input('docNoIn') docNo: string;
  @Input('docNameIn') docName: string;
  @Input('docDateIn') docDate: string;

  constructor(private mfService: MainformService) { }

  ngOnInit() {
    let d = new Date();
    let s: string;
    let DayNo: string = d.getDate().toString();
    if (d.getDate() < 10) DayNo = '0' + d.getDate().toString();
    let MontNo: string = d.getMonth().toString();
    if (d.getMonth() < 10) MontNo = '0' + d.getMonth().toString();
    let HoursNo: string = d.getHours().toString();
    if (d.getHours() < 10) HoursNo = '0' + d.getHours().toString();
    let MinutesNo: string =  d.getMinutes().toString()+':00';
    if (d.getMinutes() < 10) MinutesNo = '0'+d.getMinutes().toString()+':00';
    s = d.getFullYear().toString();
    s = s +'-'+MontNo+'-'+DayNo+'T'+HoursNo+':'+MinutesNo;
    this.docDate = s;

    /*     this.mfService.getOperation().subscribe(
      (v) => {this.docNo = v.doc_no;
              this.docName = v.doc_name;
            console.log(v.doc_no, v.doc_name)}
    ) */
  }

  setDn(e: any){
    console.log(e);
  }

}
