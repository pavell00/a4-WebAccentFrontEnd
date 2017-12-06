import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'check-cell',
    template: `<input type="checkbox" [checked]="valueCheck()" (click)="onClick(this)">`
})
export class CheckComponent implements ICellRendererAngularComp {
    private params: any;
    private check: boolean;

    // called on init
    agInit(params: any): void {
        this.params = params;
        this.check = this.params.data.checked;
        //console.log(params);
        switch (this.params.colDef.colId) {
            case 'isVisible':
                this.check = this.params.data.checked;
                break;
            case 'isEditable':
                this.check = this.params.data.editable;
                break;
            default:
                this.check = this.params.data.checked;
                break;
        }
    }

    // called when the cell is refreshed
    refresh(params: any): boolean {
/*         console.log('refresh');
        this.params = params;
        this.check = this.params.data.checked; */
        return true;
    }

    public valueCheck(): boolean {
        return this.check;
    }

    onClick(e: any) {
        //console.log(e);
        //console.log('before '+ JSON.stringify(e.params.data));
        switch (this.params.colDef.colId) {
            case 'isVisible':
                this.params.data.checked = !e.params.data.checked;
                this.check = this.params.data.checked;
                break;
            case 'isEditable':
                this.params.data.editable = !e.params.data.editable;
                this.check = this.params.data.editable;
                break;
            default:
                break;
        }
        //console.log('after '+e.params.data);
    }
}