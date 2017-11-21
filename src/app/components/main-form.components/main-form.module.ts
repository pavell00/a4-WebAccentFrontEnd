import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgentSelectorComponent, BinderSelectorComponent,
    DocNoDateComponent, 
    PriceListComponent, SearchEntityComponent,
    TableEntityComponent, TemplateSelectorComponent } from './index';
import { MainFormComponent } from './main-form/main-form.component';

import { CalendarModule, DataTableModule, ContextMenuModule, MenuModule,
    ToolbarModule, SplitButtonModule, DialogModule,
    InputSwitchModule, DropdownModule, CheckboxModule,
    RadioButtonModule, MenubarModule, AutoCompleteModule,
    PanelModule } from 'primeng/primeng';
import {DataTableModule as a2_DataTableModule} from "angular2-datatable";

@NgModule({
    imports: [
        CommonModule,
        FormsModule, DialogModule, MenubarModule, DropdownModule, a2_DataTableModule
    ],
    declarations: [AgentSelectorComponent, BinderSelectorComponent,
        DocNoDateComponent, 
        PriceListComponent, SearchEntityComponent,
        TableEntityComponent, TemplateSelectorComponent, MainFormComponent
    ],
    exports: [AgentSelectorComponent, BinderSelectorComponent,
        DocNoDateComponent, 
        PriceListComponent, SearchEntityComponent,
        TableEntityComponent, TemplateSelectorComponent, MainFormComponent]
  })

  export class MainFormModule {}