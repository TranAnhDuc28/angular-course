import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HelloComponent} from "./lesson1/hello/hello.component";
import { HiComponent } from './lesson1/hi/hi.component';
import { DataAndEventBindingComponent } from './lesson2/data-and-event-binding/data-and-event-binding.component';
import {FormsModule} from "@angular/forms";
import { DirectiveNgifComponent } from './lesson3/directive-ngif/directive-ngif.component';
import { DrectiveNgforComponent } from './lesson4/drective-ngfor/drective-ngfor.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    HiComponent,
    DataAndEventBindingComponent,
    DirectiveNgifComponent,
    DrectiveNgforComponent
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
