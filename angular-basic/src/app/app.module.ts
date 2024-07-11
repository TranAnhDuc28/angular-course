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
import { InpitBindingComponent } from './lesson6/inpit-binding/inpit-binding.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    HiComponent,
    DataAndEventBindingComponent,
    DirectiveNgifComponent,
    DirectiveNgforComponent,
    ClassAndStyleBindingComponent,
    InpitBindingComponent
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
