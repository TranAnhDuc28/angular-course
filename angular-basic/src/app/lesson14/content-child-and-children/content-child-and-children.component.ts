import {Component, forwardRef} from '@angular/core';
import {TabGroupComponent} from "../../lesson13/dependency-injection/tab-group.component";

const contentChildAndChildrenComponent = {
  provide: TabGroupComponent,
  useExisting: forwardRef(() => ContentChildAndChildrenComponent)
}

@Component({
  selector: 'app-content-child-and-children',
  template: `
    <ul class="nav nav-tabs">
      <li class="nav-item" *ngFor="let tab of tabPanelList; index as indexTab">
        <a class="nav-link" (click)="selectedTabPanel(indexTab)"
           [class.active]="indexTab === activeIndex">
          {{ tab.title }}
          <button class="btn btn-danger" (click)="removeTab(tab)">X</button>
        </a>
      </li>
    </ul>

    <div class="tab-body" *ngIf="tabPanelList.length; else noTabs">
      <ng-container *ngTemplateOutlet="tabPanelList[activeIndex].panelContent"></ng-container>
    </div>
    <ng-template #noTabs>
      No more tabs.
    </ng-template>
  `,
  styleUrls: ['./content-child-and-children.component.css'],
  providers: [contentChildAndChildrenComponent]
})
export class ContentChildAndChildrenComponent extends TabGroupComponent{

}
