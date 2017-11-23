import { Component, OnInit, Input } from '@angular/core';
import { Agents, Op, Transactions } from '../../../model';
import { MainformService } from '../../../services/main-form.service';
import { OperationService } from '../../../services/operation.service';
import { Logger } from "angular2-logger/core";

@Component({
  selector: 'agent-selector',
  templateUrl: './agent-selector.component.html',
  styleUrls: ['./agent-selector.component.css']
})
export class AgentSelectorComponent implements OnInit {

  displayDialog: boolean;
  private AgTo: Agents = {};
  private AgFrom: Agents = {};
  AgToName: string;
  AgFromName: string;
  agents: Agents[] = [];
  private currentTrgAgName: string;
  selectedAgent: Agents;
  private index: number = 0;
  private result_length: number;
  private bFlag: boolean = false;
  private op: Op;

  constructor(private mformService: MainformService,
              private operationService: OperationService,
              private _logger: Logger) { }

    ngOnInit() {
      this.operationService.getCurrentOperation().subscribe(
        (v) => {this.op = v;
                if (this.op.transactions[0].j_ag1 != 0 && this.op.transactions[0].j_ag1 != undefined) {
                    this.mformService.searchAgentPromise('ID', '', this.op.transactions[0].j_ag1)
                    .then(data => { this.AgTo = data[0]; this.AgToName = this.AgTo.agName;})
                    .catch(error => this._logger.error(error));
                } else {this.AgTo = {}; this.AgToName=''}
                if (this.op.transactions[0].j_ag2 != 0 && this.op.transactions[0].j_ag2 != undefined) {
                    this.mformService.searchAgentPromise('ID', '', this.op.transactions[0].j_ag2)
                    .then(data => { this.AgFrom = data[0]; this.AgFromName = this.AgFrom.agName;})
                    .catch(error => this._logger.error(error));
                } else {this.AgFrom = {}; this.AgFromName='';}
        }
      )
    }

    setAgents(Ag: Agents, AgType: string){
      if (AgType === 'AgTo') {
          this.AgTo = Ag;
          this.AgToName = Ag.agName;
      } else {
        this.AgFrom = Ag;
        this.AgFromName = Ag.agName;
      }
    }

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
      this.operationService.setAgents(this.AgTo.id, 'searchAgentTo');
    }
    if (this.currentTrgAgName === 'searchAgentFrom'){
      this.AgFrom = this.selectedAgent;
      this.AgFromName = this.selectedAgent.agName;
      this.operationService.setAgents(this.AgFrom.id, 'searchAgentFrom')
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
