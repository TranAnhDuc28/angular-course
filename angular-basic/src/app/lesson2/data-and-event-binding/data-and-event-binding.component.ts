import {Component, VERSION} from '@angular/core';


@Component({
  selector: 'app-data-and-event-binding',
  templateUrl: './data-and-event-binding.component.html',
  styleUrls: ['./data-and-event-binding.component.css']
})
export class DataAndEventBindingComponent {
  name = 'Angular ' + VERSION.major;

  inputType = 'text'; // property binding

  user = {
    name: 'Duc',
    age: 28,
  };

  handler(event: Event) {
    console.log('Button clicked!', event);
  }

}
