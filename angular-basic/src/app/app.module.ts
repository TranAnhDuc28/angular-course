import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HelloComponent} from "./lesson1/hello/hello.component";
import { HiComponent } from './lesson1/hi/hi.component';
import { DataAndEventBindingComponent } from './lesson2/data-and-event-binding/data-and-event-binding.component';
import {FormsModule} from "@angular/forms";
import { DirectiveNgifComponent } from './lesson3/directive-ngif/directive-ngif.component';
import { DirectiveNgforComponent } from './lesson4/directive-ngfor/directive-ngfor.component';
import { ClassAndStyleBindingComponent } from './lesson5/class-and-style-binding/class-and-style-binding.component';
import { InputBindingComponent} from './lesson6/inpit-binding/input-binding.component';
import {ProgressBarComponent} from "./lesson6/progress-bar.component";
import { AuthorListComponent } from './lesson7/output-binding/author-list.component';
import {AuthorDetailsComponent} from "./lesson7/output-binding/author-details.component";
import { TwoWayBindingComponent } from './lesson8/two-way-binding/two-way-binding.component';
import {ToggleComponent} from "./common/toggle.component";
import { TemplateVariableAndViewChildViewChildrenComponent } from './lesson9/template-variable-and-view-child-view-children.component/template-variable-and-view-child-view-children.component';
import {FlexComponent} from "./lesson10/typescript-data-type/example-type-alias-and-union-type/flex.component";
import { ContentProjectionComponent } from './lesson11/content-projection/content-projection.component';
import { NgTemplateNgTemplateOutletNgContainerComponent } from './lesson12/ng-template-ng-template-outlet-ng-container/ng-template-ng-template-outlet-ng-container.component';
import {TabsComponent} from "./lesson12/tabs.component";
import { TabGroupComponent } from './lesson13/dependency-injection/tab-group.component';
import {TabPanelComponent} from "./lesson13/dependency-injection/tab-panel.component";
import {TabBootstrapGroupComponent} from "./lesson13/dependency-injection/tab-bootstrap-group.component";

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    HiComponent,
    DataAndEventBindingComponent,
    DirectiveNgifComponent,
    DirectiveNgforComponent,
    ClassAndStyleBindingComponent,
    InputBindingComponent,
    ProgressBarComponent,
    AuthorListComponent,
    AuthorDetailsComponent,
    TwoWayBindingComponent,
    ToggleComponent,
    TemplateVariableAndViewChildViewChildrenComponent,
    FlexComponent,
    ContentProjectionComponent,
    NgTemplateNgTemplateOutletNgContainerComponent,
    TabsComponent,
    TabGroupComponent,
    TabPanelComponent,
    TabBootstrapGroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
