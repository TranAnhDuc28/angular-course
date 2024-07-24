import {Component} from "@angular/core";

let count = 1;

@Component({
  selector: 'counter',
  template: `counter: {{ count }}`,
  styles: [`
  :host {
    display: block;
  }
  `]
})
export class CounterComponent {
  count: number = count++;
}
