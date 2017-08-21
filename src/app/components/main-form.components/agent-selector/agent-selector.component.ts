import { Component, OnInit, Input } from '@angular/core';
import { Agents } from '../../../model';
import { MainformService } from '../../../services/main-form.service';
import { Logger } from "angular2-logger/core";

@Component({
  selector: 'agent-selector',
  templateUrl: './agent-selector.component.html',
  styleUrls: ['./agent-selector.component.css']
})
export class AgentSelectorComponent implements OnInit {

  private displayDialog: boolean;
  private AgTo: Agents;
  private AgFrom: Agents;
  private AgToName: string;
  private AgFromName: string;
  private agents: Agents[] = [];
  private currentTrgAgName: string;
  private selectedAgent: Agents;
  private index: number = 0;
  private result_length: number;
  private bFlag: boolean = false;

  constructor(private mformService: MainformService,
              private _logger: Logger) { }

  ngOnInit() { }

  clearSearch(e: string, a: string){
    if (e === ''){
      this._logger.info(a);
      if (a === 'searchAgentTo') {
        this.AgTo = undefined;
        this.AgToName = '';
      }
      if (a === 'searchAgentFrom') {
        this.AgFrom = undefined;
        this.AgFromName = '';
      }
    } //this._logger.info('handler search!')
  }

  onInputSearchTermAgent(e: any) {
    if (e.key === 'Enter') {
      if (e.target.name === 'searchAgentTo') {
        //console.log(e.target.name, this.AgToName);
        //this._logger.info(e.target.name, this.AgToName);
        this.currentTrgAgName = e.target.name;
        if(this.AgToName !== undefined && this.AgToName !== '' && this.AgToName.length >= 2){
          this.searchAgent(this.AgToName);
          this.displayDialog = true;
        }
      }
      if (e.target.name === 'searchAgentFrom') {
        //console.log(e.target.name, this.AgFrom);
        this.currentTrgAgName = e.target.name;
        //this._logger.info(e.target.name, this.AgFromName);
        if(this.AgFromName !== undefined && this.AgFromName !== '' && this.AgFromName.length >= 2){
          this.searchAgent(this.AgFromName);
          this.displayDialog = true;
        }
      }
    }
  }

  searchAgent(term :string) {
    this.mformService.searchAgent('name', term, 0).subscribe(
        (v) => {this.agents = v;
                this.selectedAgent = this.agents[0];
                this.result_length = this.agents.length;},
        (error) => (console.log(error)),
        () => true
    )
  }

  onSelect(a: Agents, i: number){
    this.selectedAgent = a;
    this.index = i;
  }

  keydown(e: any){
  /*  //console.log(e.key)
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

  onClickOk(){
    if (this.currentTrgAgName === 'searchAgentTo'){
      this.AgTo = this.selectedAgent;
      this.AgToName = this.selectedAgent.agName;
    }
    if (this.currentTrgAgName === 'searchAgentFrom'){
      this.AgFrom = this.selectedAgent;
      this.AgFromName = this.selectedAgent.agName;
    }
    this.displayDialog = false
  }

  onClickNo(){
    this.index = 0;
    this.displayDialog = false
    switch (this.currentTrgAgName) {
      case 'searchAgentTo':
        if (this.AgTo != undefined)
          {
            this.AgToName = this.AgTo.agName
          } else {
             this.AgToName = '';
          }
        break;
      case 'searchAgentFrom':
        if (this.AgFrom != undefined) {
          this.AgFromName = this.AgFrom.agName;
        } else {
          this.AgFromName = '';
        }
        break;
      default:
        break;
    }
  }

}
