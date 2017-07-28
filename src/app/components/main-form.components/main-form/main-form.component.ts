import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { BinderSelectorComponent } from '../binder-selector/binder-selector.component';
import { TemplateSelectorComponent } from '../template-selector/template-selector.component';
import { MainformService } from '../../../services/main-form.service';

@Component({
  selector: 'main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
  providers: [MainformService]
})
export class MainFormComponent implements OnInit, OnChanges {

    @ViewChild(BinderSelectorComponent) private bsc: BinderSelectorComponent;
    @ViewChild(TemplateSelectorComponent) private tsc: TemplateSelectorComponent;
    @Input() curentdoc: Document;

    private items: MenuItem[];
    private currentTemlateID: number = 1;
    private linkTemplatesID: number[] = [1, 2, 3, 4];
    changeLog: any[]=[];

    constructor() { }

    ngOnChanges(changes: SimpleChanges) {
/*         for (let propName in changes) {
            let chng = changes[propName];
            let cur  = JSON.stringify(chng.currentValue);
            let prev = JSON.stringify(chng.previousValue);
            this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
        } */
        //console.log(changes["curentdoc"].currentValue);
        if (changes["curentdoc"].currentValue != undefined) {
            
        }
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Новый',
                icon: 'fa-file-o',
                //routerLink: ['change'],
                command: () => this.test('New')
            }, {
                label: 'Сохранить',
                icon: 'fa-floppy-o',
                disabled: true
            }, {
                label: 'Закрыть',
                icon: 'fa-times'
            }, {
                label: 'Печать',
                icon: 'fa-print',
                items: [
                        {label: 'Печать в PDF',
                            icon: 'fa-file-pdf-o',
                            command: () => this.test('Печать в PDF')},
                        {label: 'Накладная ДНР',
                            icon: 'fa-print',
                            command: () => this.test('Накладная ДНР')},
                        ]
            }, {
                label: 'Проводки',
                icon: 'fa-list-ol',
                command: () => this.test('Проводки')
            }, {
                label: 'Шаблоны',
                icon: 'fa-clipboard',
                command: () => this.tsc.ShowDialogTemplateSelector()
            }, {
                label: 'Связи',
                icon: 'fa-link',
                command: () => this.test('Связанные')
            }, {
                label: 'Подшивки',
                icon: 'fa-thumb-tack',
                items: [
                        {label: 'Добавить',
                            icon: 'fa-plus-circle',
                            command: () => this.bsc.addBinders()},
                        {label: 'Удалить',
                            icon: 'fa-minus-circle',
                            command: () => this.bsc.ShowDialogDelBinder()},
                        ]
            }];
    }

    test(e: any){
        console.log('command! ', e);
    }

}