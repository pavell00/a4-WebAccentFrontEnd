import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { AppService } from '../../services/app.service';
import { SelectItem } from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'type-selector',
  templateUrl: 'type-selector.component.html',
  styleUrls: ['type-selector.component.css']
})
export class TypeSelectorComponent implements OnInit {

    private ElementTypes: SelectItem[];
    private selectedType: SelectItem;
    @Output() EventTypeSelector: EventEmitter<any> = new EventEmitter();

  constructor(private appService: AppService) { }

  ngOnInit() {
        this.ElementTypes = [];
        this.ElementTypes.push({label:'Documents', value:{id:1, name: 'Documents', code: 'document_type'}});
        this.ElementTypes.push({label:'Accounts', value:{id:2, name: 'Accounts', code: 'account_type'}});
        this.ElementTypes.push({label:'Agents', value:{id:3, name: 'Agents', code: 'agent_type'}});
        this.ElementTypes.push({label:'Entities', value:{id:4, name: 'Entities', code: 'entity_type'}});
        this.ElementTypes.push({label:'Miscs', value:{id:5, name: 'Miscs', code: 'misc_type'}});
        this.ElementTypes.push({label:'Templates', value:{id:6, name: 'Templates', code: 'template_type'}});
        //set dedault value of type selector
        this.selectedType = this.ElementTypes[0];
        //console.log(this.selectedType.value.code);
        this.appService.setTypeSelector(this.selectedType.value.code);
  }

  onChangeDropDown(e: SelectItem){
    //console.log(e.value.code);
    this.EventTypeSelector.emit(e.value.code);
    this.appService.setTypeSelector(e.value.code);
  }
}
