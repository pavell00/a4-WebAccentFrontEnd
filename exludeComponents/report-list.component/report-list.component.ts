import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'report-list',
    templateUrl: 'report-list.component.html',
    styles: [ ':host { position: relative; bottom: 10%; }' ]
})

export class ReportListComponent implements OnInit {
    elements: any = [];
    private _test: any;
    message: any;
    
    @Input()
        set test(t: any){ this._test = t;}
        get test(): any{ return this._test;}
    
    details: string;
    sending = false;

    constructor(private router: Router) {this.elements = [{'name':'OSV 361'}, {'name':'Saldo in Plaint'}, {'name':'Remains in store'}] }

    ngOnInit() { }

    send() {
        this.sending = true;
        this.details = 'Sending Message...';
     
        setTimeout(() => {
          this.sending = false;
          this.closePopup();
        }, 1000);
    }

    cancel() {
        this.closePopup();
    }

    closePopup() {
        // Providing a `null` value to the named outlet
        // clears the contents of the named outlet
        this.router.navigate([{ outlets: { popup: null }}]);
    }
}