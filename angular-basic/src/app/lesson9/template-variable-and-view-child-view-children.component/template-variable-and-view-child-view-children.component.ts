import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ToggleComponent} from "../../common/toggle.component";

@Component({
  selector: 'app-template-variable-and-view-child-view-children',
  templateUrl: './template-variable-and-view-child-view-children.component.html',
})
export class TemplateVariableAndViewChildViewChildrenComponent implements OnInit, AfterViewInit {

  // @ViewChild tham chiếu tới component
  // @ViewChild('toggleComp') toggleComp?: ToggleComponent;
  // @ViewChild(ToggleComponent, {static: true}) toggleComp?: ToggleComponent;

  // @ViewChild tham chiếu tới HTMLElement
  @ViewChild('toggleBtn', { static: true}) toggleBtn?: ElementRef<HTMLButtonElement>;
  @ViewChild('nameInput', { static: true}) nameInput?: ElementRef<HTMLInputElement>;

  // @ViewChildren tham chiếu tới tất cả các component con
  @ViewChildren(ToggleComponent) toggleComps?: QueryList<ToggleComponent>;

  isChecked = true;
  showLast = true;

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.nameInput?.nativeElement.focus();
    // }, 3000);
    // console.log('OnInit', this.toggleComp, this.toggleBtn);
    console.log(this.nameInput);
  }

  ngAfterViewInit(): void {
    // console.log('AfterViewInit', this.toggleComp);
    this.toggleComps?.changes.subscribe(console.log);
  }
}
