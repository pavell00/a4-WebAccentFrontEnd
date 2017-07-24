import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { AppService } from '../../services/app.service';

@Component({
  moduleId: module.id,
  selector: 'calendar-dlg',
  templateUrl: 'calendar-dlg.component.html',
  styleUrls: ['calendar-dlg.component.css']
})
export class CalendarDlgComponent implements OnInit {

  private display: boolean = false;
  private years: SelectItem[] = [];
  private months: SelectItem[] = [];
  private quartals: SelectItem[] = [];
  private semiyears: SelectItem[] = [];
  private selectedYear: number;
  private selectedMonth: number;
  private selectedQurtal: string;
  private selectedSemiYear: string;
  private selectedType: string;
  private startDate: string;
  private endDate: string;
  
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.years.push({label: '2016', value: 2016});
    this.years.push({label: '2017', value: 2017});
    this.years.push({label: '2018', value: 2018});
    //set default year
    this.selectedYear = new Date().getFullYear();
    
    this.months.push({label: 'Январь', value: 0});
    this.months.push({label: 'Февраль', value: 1});
    this.months.push({label: 'Март', value: 2});
    this.months.push({label: 'Апрель', value: 3});
    this.months.push({label: 'Май', value: 4});
    this.months.push({label: 'Июнь', value: 5});
    this.months.push({label: 'Июль', value: 6});
    this.months.push({label: 'Август', value: 7});
    this.months.push({label: 'Сентябрь', value: 8});
    this.months.push({label: 'Октябрь', value: 9});
    this.months.push({label: 'Ноябрь', value: 10});
    this.months.push({label: 'Декабрь', value: 11});
    //set default date
    this.selectedMonth = (new Date().getMonth());
    this.onMonth(this.selectedMonth);

    this.quartals.push({label: 'Первый', value: 1});
    this.quartals.push({label: 'Второй', value: 2});
    this.quartals.push({label: 'Третий', value: 3});
    this.quartals.push({label: 'Четвертый', value: 4});

    this.semiyears.push({label: 'Первое', value: 1});
    this.semiyears.push({label: 'Второе', value: 2});
  }

  showDialog() {this.display = true;}

  onOkClick(){
      this.appService.setCalendar(this.startDate, this.endDate);
      this.appService.searchDocs4();
  }

  onMonth(n: number){
      this.selectedMonth = n;
      let d = new Date();
      //first day of month
      d.setDate(1);
      d.setMonth(n);
      d.setFullYear(this.selectedYear);
      this.onSelectStartDate(d);
      //last day of month
      let d2 = new Date(this.selectedYear, n + 1, 0);
      this.onSelectEndDate(d2);
  }

  onQuartal(n: number){
      let d = new Date();
      let d2 = new Date();
      d.setDate(1);
      switch (n) {
        case 1:
          d.setMonth(0);
          d.setFullYear(this.selectedYear);
          this.onSelectStartDate(d);
          d2 = new Date(this.selectedYear, 3, 0);
          this.onSelectEndDate(d2);
          break;
        case 2:
          d.setMonth(3);
          d.setFullYear(this.selectedYear);
          this.onSelectStartDate(d);
          d2 = new Date(this.selectedYear, 6, 0);
          this.onSelectEndDate(d2);
          break;
        case 3:
          d.setMonth(6);
          d.setFullYear(this.selectedYear);
          this.onSelectStartDate(d);
          d2 = new Date(this.selectedYear, 9, 0);
          this.onSelectEndDate(d2);
          break;
        case 4:
          d.setMonth(9);
          d.setFullYear(this.selectedYear);
          this.onSelectStartDate(d);
          d2 = new Date(this.selectedYear, 11, 31);
          this.onSelectEndDate(d2);
          break;
        default:
          alert("Wrong Quartal!"); 
          break;
      }
  }

  onSemiyear(n: number){
      let d = new Date();
      let d2 = new Date();
      d.setDate(1);
      switch (n) {
        case 1:
          d.setMonth(0);
          d.setFullYear(this.selectedYear);
          this.onSelectStartDate(d);
          d2 = new Date(this.selectedYear, 6, 0);
          this.onSelectEndDate(d2);
          break;
        case 2:
          d.setMonth(6);
          d.setFullYear(this.selectedYear);
          this.onSelectStartDate(d);
          d2 = new Date(this.selectedYear, 11, 31);
          this.onSelectEndDate(d2);
          break;
        default:
          alert("Wrong Semiyear!"); 
          break;
      }
  }

  onCurrentYear(){
    this.onSelectStartDate(new Date(this.selectedYear, 0, 1));
    this.onSelectEndDate(new Date(this.selectedYear, 11, 31));
  }

  onAllData(){
    this.onSelectStartDate(new Date(2000, 0, 1));
    this.onSelectEndDate(new Date(2040, 11, 31));    
  }

  onSelectStartDate(d: Date){
      this.startDate = d.toLocaleDateString()
  }

  onSelectEndDate(d: Date){
      this.endDate = d.toLocaleDateString()
  }
}
