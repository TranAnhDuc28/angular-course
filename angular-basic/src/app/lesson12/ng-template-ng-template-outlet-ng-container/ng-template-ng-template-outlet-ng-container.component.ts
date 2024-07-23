import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-template-ng-template-outlet-ng-container',
  templateUrl: './ng-template-ng-template-outlet-ng-container.component.html',
  styleUrls: ['./ng-template-ng-template-outlet-ng-container.component.css']
})
export class NgTemplateNgTemplateOutletNgContainerComponent {
  age: number = 15;
  counter: number = 1;
  navTitles: string[] = ['Active', 'Link', 'Link'];
}
