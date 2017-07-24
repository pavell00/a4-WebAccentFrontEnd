import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'inner',
    template: `<div><h1>Inner One</h1></div>`
})

export class InnerComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}