import { Component, OnInit } from '@angular/core';
import { Templates } from '../../../model/template';
import { MainformService } from '../../../services/main-form.service';
import { Logger } from "angular2-logger/core";

@Component({
  selector: 'template-selector',
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.css']
})
export class TemplateSelectorComponent implements OnInit {

  private displayDialog: boolean;
  private linkTemplates: Templates[] = [];
  private currentTemplateID: string = "3";
  private currentFormID: string = "1";
  private templates: Templates[] = [];
  private selectedTemplate: Templates;
  private index: number = 0;

  constructor(private mformService: MainformService,
              private _logger: Logger) { }

  ngOnInit() {  }

  searchTemplate(term :string, nameField:string) {
    this.mformService.searchTemplate(term, nameField).subscribe(
        (v) => {this.linkTemplates = v;
                if (this.currentTemplateID != ''){
                  let i: number = 0;
                  this.linkTemplates.forEach(element => {
                    if (element.tml_id.toString() == this.currentTemplateID) {
                      this.index = i;
                      this.selectedTemplate = element;
                    }
                    ++i;
                  });
                }},
        (error) => (console.log(error)),
        () => true
    )
  }

  ShowDialogTemplateSelector(){
    this.searchTemplate(this.currentFormID, 'frm_id');
    this.displayDialog = true;
  }

  onCloseSelectTml(){
    this.displayDialog = false;
    this.currentTemplateID = this.selectedTemplate.tml_id.toString();
    //console.log(this.currentTemplateID);
  }

  onSelect(a: Templates, i: number){
    this.selectedTemplate = a;
    this.index = i;
  }

}
