import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {

  private currentTimeout: any;
  private isDelayedRunning: boolean = false;

  @Input()
  public delay: number = 300;

  @Input()
  public set isRunning(value: boolean) {
      if (!value) {
          this.cancelTimeout();
          this.isDelayedRunning = false;
          return;
      }

      if (this.currentTimeout) {
          return;
      }

      this.currentTimeout = setTimeout(() => {
          this.isDelayedRunning = value;
          this.cancelTimeout();
      }, this.delay);
  }

  private cancelTimeout(): void {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = undefined;
  }

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): any {
    this.cancelTimeout();
  }
}
