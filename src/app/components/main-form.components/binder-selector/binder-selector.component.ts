import { Component, OnInit } from '@angular/core';
import { Binders } from '../../../model';
import { MainformService } from '../../../services/main-form.service';
import { Logger } from "angular2-logger/core";

@Component({
  selector: 'binder-selector',
  templateUrl: './binder-selector.component.html',
  styleUrls: ['./binder-selector.component.css']
})
export class BinderSelectorComponent implements OnInit {

  private displayDialogAddBinders: boolean;
  private displayDialogDelBinders: boolean;
  private linkBinders: string[] =
      ['Расчеты за материалы', 'Бутков', 'Напханюк В.Н.'];//refactor to add object Binders type
  private BinderName: string;
  
  private binders: Binders[] = [];
  private currentTrgBindName: string;
  private selectedBinder: Binders;
  private index: number = 0;
  private result_length: number;
  private bFlag: boolean = false;

  constructor(private mformService: MainformService,
              private _logger: Logger) { }

  ngOnInit() {  }

  onInputSearchTermBinder(e: any) {
    if (e.key === 'Enter') {
      if (e.target.name === 'searchBinder') {
        //console.log(e.target.name, this.AgToName);
        //this._logger.info(e.target.name, this.AgToName);
        this.currentTrgBindName = e.target.name;
        if(this.BinderName !== undefined && this.BinderName !== '' && this.BinderName.length >= 2){
          this.searchBinder(this.BinderName);
          this.displayDialogAddBinders = true;
        }
      }
    }
  }

  addBinders() {
    this.searchBinder('');
    this.displayDialogAddBinders = true;
  }

  searchBinder(term :string) {
    this.mformService.searchBinder(term).subscribe(
        (v) => {this.binders = v;
                this.selectedBinder = this.binders[0];
                this.result_length = this.binders.length;},
        (error) => (console.log(error)),
        () => true
    )
  }

  onSelect(a: Binders, i: number) {
    this.selectedBinder = a;
    this.index = i;
  }

  onClickOk() {
  //  if (this.currentTrgBindName === 'searchBinder'){
      this.linkBinders.push(this.selectedBinder.bindName);//refactor to add object Binders type
      this.BinderName = '';
   // }
    this.displayDialogAddBinders = false
    console.log(JSON.stringify(this.linkBinders));
  }

  onClickNo() {
    this.index = 0;
    this.displayDialogAddBinders = false
  }

  clearSearch(e: string, a: string) {
     if (e === ''){
      this._logger.info(a);
      if (a === 'searchBinder') {
        this.linkBinders = undefined;
        this.BinderName = '';
      }
    } //this._logger.info('handler search!') 
  }

  keydown(e: any) {
  /*    //console.log(e.key)
      switch (e.key) {
        case 'ArrowUp':
          if (this.index > 0) {
            this.index--
            this.selectedAgent = this.agents[this.index]
            this.bFlag = true;
          }
          break;
        case 'ArrowDown':
          if (this.index < this.result_length-1) {
            this.index++
            this.selectedAgent = this.agents[this.index]
            this.bFlag = true;
          }
          break;
        case 'Enter':
          if (this.bFlag === true) { //костыль от самосрабатывания окна поиска ?
            console.log(true);
            this.onClickOk();
            this.bFlag = false;
          }
          break;
        case 'Escape':
          this.onClickNo();
          break;
        default:
          break;
      }*/
  }

  onClickCloseDelBinders() {
    this.displayDialogDelBinders = false;
  }

  ShowDialogDelBinder() {
    this.displayDialogDelBinders = true;
  }

  removeBinder(ri: number) {
    this.linkBinders = this.linkBinders.filter((val, i) => i!=ri);
  }
}
