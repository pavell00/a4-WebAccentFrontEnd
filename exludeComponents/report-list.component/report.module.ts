import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ReportListComponent } from './report-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [ReportListComponent],
    declarations: [
        ReportListComponent
    ]
})

export class ReportModule{}