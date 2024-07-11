import { Component } from '@angular/core';

/**
 * CLASS BINDING
 * STYLE BINDING
 */

@Component({
  selector: 'app-class-and-style-binding',
  templateUrl: './class-and-style-binding.component.html',
  styleUrls: ['./class-and-style-binding.component.css']
})
export class ClassAndStyleBindingComponent {
  isDanger = false;
  isWarning = false;
  classes = 'box red-border yellow-background';

}
