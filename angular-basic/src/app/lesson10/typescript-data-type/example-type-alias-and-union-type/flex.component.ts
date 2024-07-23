import {Component, HostBinding, Input} from "@angular/core";

type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

@Component({
  selector: 'flex-container',
  template: `<ng-content></ng-content>`,
})
export class FlexComponent {
  @Input() flexDirection: FlexDirection = 'row';

  @HostBinding('style.display') get display() {
    return 'flex';
  }

  @HostBinding('style.flex-direction') get direction() {
    return this.flexDirection;
  }
}


/** Type Alias
 * - HostBinding để bind giá trị lên selector tag <flex-container></flex-container>
 */
