import { Component } from '@angular/core';

// Parent component
@Component({
  selector: 'app-input-binding',
  templateUrl: './input-binding.component.html',
  styleUrls: ['./input-binding.component.css']
})
export class InputBindingComponent {
  currentProgress = 70;
}
