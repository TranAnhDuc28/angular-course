import {Component, Input, TemplateRef} from "@angular/core";

@Component({
  selector: 'nav-tabs',
  template: `
    <!--
     - ngTemplateOutlet là cách dùng để render một template được tạo ra bởi ng-template
     - component có @Input() để truyền data từ bên ngoài vào, thì ng-template cũng có cú pháp
     tương tự để truyền data. Đó chính là ngTemplateOutletContext
    -->
    <ul class="nav nav-tabs mx-4">
      <li class="nav-item" *ngFor="let link of navTitles">
        <a class="nav-link" href="#">
            <ng-container *ngIf="linkTemplate; else noTemplate">
<!--              <ng-container [ngTemplateOutlet]="linkTemplate" [ngTemplateOutletContext]="{link: link}" ></ng-container>-->
<!--              <ng-container *ngTemplateOutlet="linkTemplate; context: {link: link}" ></ng-container>-->
              <ng-container *ngTemplateOutlet="linkTemplate; context: {$implicit: link}" ></ng-container>
            </ng-container>
          <ng-template #noTemplate>
            {{ link }}
          </ng-template>
        </a>
      </li>
    </ul>
  `
})
export class TabsComponent {
  @Input() navTitles: string[] = [];
  @Input() linkTemplate?: TemplateRef<any>;
}
