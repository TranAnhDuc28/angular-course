import {Component, forwardRef} from "@angular/core";
import {TabGroupComponent} from "./tab-group.component";

const tabBsGroupComponent = {
  provide: TabGroupComponent,
  useExisting: forwardRef(() => TabBootstrapGroupComponent)
}

@Component({
  selector: 'tab-bootstrap-group',
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
      <ng-container *ngTemplateOutlet="tabPanelList[activeIndex].panelBody"></ng-container>
    </div>
    <ng-template #noTabs>
      No more tabs.
    </ng-template>
  `,
  providers: [tabBsGroupComponent]
})
export class TabBootstrapGroupComponent extends TabGroupComponent{

}
