import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent {
  @Input() header?: string;
  @Input() question?: string;
  @Input() content?: string;

  @Input() canskip?: boolean;
  @Output() skip = new EventEmitter<boolean>();

  @Input() checked?: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  toggle() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
