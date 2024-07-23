import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TabPanelComponent} from "./tab-panel.component";

@Component({
  selector: 'tab-group',
  template: `
    <div class="tab-header">
      <div class="tab-header-item" (click)="selectedTabPanel(indexTab)"
           [class.active]="indexTab === activeIndex"
           *ngFor="let tab of tabPanelList; index as indexTab">
        {{ tab.title }}
        <button (click)="removeTab(tab)">X</button>
      </div>
    </div>

    <div class="tab-body" *ngIf="tabPanelList.length; else noTabs">
      <ng-container *ngTemplateOutlet="tabPanelList[activeIndex].panelBody"></ng-container>
    </div>
    <ng-template #noTabs>
      No more tabs.
    </ng-template>
  `,
  styles: [
    `
      @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');

      .tab-header {
        display: flex;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #000;
        margin-bottom: 0.5rem;
      }

      .tab-header-item {
        margin-right: 0.5rem;
        padding: 5px 10px;
        cursor: pointer;
      }

      .tab-header-item.active {
        border: 1px solid red;
      }
    `
  ]
})
export class TabGroupComponent {
  tabPanelList: TabPanelComponent[] = [];

  @Input() activeIndex: number = 0;
  @Output() activeIndexChange = new EventEmitter<number>();

  addTab(tab: TabPanelComponent): void {
    // this.tabPanellist.push(tab);
    this.tabPanelList = [...this.tabPanelList, tab];
  }

  removeTab(tab: TabPanelComponent): void {
    let indexFound = -1;

    //  Phương thức filter của mảng sẽ tạo ra một mảng mới gồm các phần tử mà hàm callback trả về true.
    //  Những phần tử mà hàm callback trả về false sẽ bị loại bỏ khỏi mảng mới
    this.tabPanelList = this.tabPanelList.filter((item, index) => {
      if(item === tab) {
        indexFound = index;
        return false;
      }
      return true;
    });

    console.log('indexFound', indexFound);
    if(indexFound !== -1 && this.tabPanelList.length > 0) {
      // nếu tab bị xoá đang là tab đang được chọn thì phát ra sự kiện activeIndexChange với giá trị mới.
      if (indexFound === this.activeIndex) {
        // indexFound bằng độ dài của danh sách tab mới (tabPanelList.length), nghĩa là tab cuối cùng đã bị xoá
        // thì phát ra giá trị indexFound - 1 (chuyển sang tab trước đó).
        // Ngược lại, phát ra giá trị indexFound (tab kế tiếp sẽ trở thành active tab).
        this.selectedTabPanel(indexFound === this.tabPanelList.length ? indexFound - 1: indexFound)
      }
      // nếu
      else if(indexFound < this.activeIndex) {
        this.selectedTabPanel(this.activeIndex - 1);
      }
    }
  }

  selectedTabPanel(idxTab: number) {
    console.log('selected tab', idxTab);
    console.log('tab active', this.activeIndex);
    this.activeIndex = idxTab;
    this.activeIndexChange.emit(idxTab);
  }
}
