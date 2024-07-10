import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-directive-ngif',
  templateUrl: './directive-ngif.component.html',
  styleUrls: ['./directive-ngif.component.css']
})
export class DirectiveNgifComponent {
  @Input() name?: string;

  user = {
    name: 'Duc',
    age: 28,
  };
}
