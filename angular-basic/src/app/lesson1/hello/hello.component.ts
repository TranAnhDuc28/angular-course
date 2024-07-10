import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked, AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from "@angular/core";

// Tạo component ide
@Component({
  selector: 'hello',
  template: `<h1>Hello {{ name }}</h1>`
})
export class HelloComponent implements OnChanges, OnInit, DoCheck, AfterContentInit,
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() name?: string;

  // COMPONENT LIFECYCLE

  // Creation (Khởi tạo):
  /**
   * ngOnChanges(): Được gọi trước ngOnInit() khi bất kỳ thuộc tính đầu vào nào (input properties) bị ràng buộc có sự thay đổi.
   * Được gọi nhiều lần khi giá trị của input property thay đổi.
   */
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('ngOnChanges called', changes);
  }

  /**
   * - ngOnInit(): Được gọi một lần sau khi các thuộc tính đầu vào ban đầu được thiết lập.
   * Đây là nơi thích hợp để khởi tạo dữ liệu của component.
   */
  ngOnInit(): void {
    console.log('HelloComponent initialized');
  }

  // Rendering (Render):
  /**
   * - ngDoCheck(): Được gọi trong mỗi chu kỳ change detection. Dùng để phát hiện và hành động
   * trên các thay đổi mà Angular không tự động phát hiện được.
   */
  ngDoCheck(): void {
    // console.log('ngDoCheck called');
  }

  /**
   * - ngAfterContentInit(): Được gọi một lần sau khi Angular
   * đã gắn kết bất kỳ nội dung nào của component (ng-content) vào view.
   */
  ngAfterContentInit(): void {
    // console.log('ngAfterContentInit called');
  }

  /**
   * - ngAfterContentChecked(): Được gọi sau mỗi lần kiểm tra nội dung của component bởi change detection.
   */
  ngAfterContentChecked() {
    // console.log('ngAfterContentChecked called');
  }

  /**
   * - ngAfterViewInit(): Được gọi một lần sau khi Angular đã khởi tạo view của component và các view con của nó.
   */
  ngAfterViewInit() {
    // console.log('ngAfterViewInit called');
  }

  /**
   * - ngAfterViewChecked(): Được gọi sau mỗi lần Angular kiểm tra view của component và các view con của nó.
   */
  ngAfterViewChecked() {
    // console.log('ngAfterViewChecked called');
  }

  // Destruction (Hủy):
  /**
   * - ngOnDestroy(): Được gọi ngay trước khi Angular hủy component. Dùng để thực hiện các tác vụ dọn dẹp như
   * hủy bỏ đăng ký (unsubscribing) và giải phóng tài nguyên.
   */
  ngOnDestroy(): void {
    console.log('HelloComponent destroyed');
  }


}
