import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'report-list',
    templateUrl: 'report-list.component.html'
})

export class ReportListComponent implements OnInit {
    private elements: any = [];
    private _test: any;
    @Input()
        set test(t: any){ this._test = t;}
        get test(): any{ return this._test;}

    constructor() {this.elements = [{'name':'OSV 361'}, {'name':'Saldo in Plaint'}, {'name':'Remains in store'}] }

    ngOnInit() { }
}