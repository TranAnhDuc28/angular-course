import {Component, ContentChild, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TabGroupComponent} from "./tab-group.component";
import {TabContentDirective} from "../../lesson14/content-child-and-children/tab-content.directive";

@Component({
  selector: 'tab-panel',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
})
export class TabPanelComponent implements OnInit, OnDestroy {

  @Input() title?: string;
  @ViewChild(TemplateRef, {static: true}) implicitBody!: TemplateRef<unknown>;
  @ContentChild(TabContentDirective, {static: true, read: TemplateRef}) explicitBody!: TemplateRef<unknown>;

  constructor(private tabGroup: TabGroupComponent) {
  }

  get panelContent(): TemplateRef<unknown> {
    return this.explicitBody || this.implicitBody;
  }

  ngOnInit(): void {
    console.log(this.explicitBody);
    this.tabGroup.addTab(this);
  }

  ngOnDestroy(): void {
    this.tabGroup.removeTab(this)
  }
}
