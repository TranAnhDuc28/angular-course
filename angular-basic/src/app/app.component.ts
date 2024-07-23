import { Component } from '@angular/core';

/**
 * - Decorators trong Angular có nhiệm vụ chính là cung cấp thông tin về cách các thành phần khác nhau
 * của ứng dụng Angular nên hoạt động và tương tác với nhau
 * - Chúng được sử dụng để thêm metadata vào các lớp (class), phương thức (method), thuộc tính (property) hoặc tham số (parameter).
 * VD:
 * + @Component: selector, template, style, v.v.
 * + @NgModule: declarations, imports, providers, và bootstrap, v.v. -> cung cấp metadata về module như các
 * component, directive, pipe, và các module khác mà nó phụ thuộc.
 * + @Injectable: cung cấp metadata cho phép Angular hiểu rằng class này có thể được sử dụng trong hệ thống dependency injection.
 * + @Input và @Output: để khai báo các thuộc tính mà component cha có thể truyền dữ liệu vào hoặc nhận sự kiện từ component con.
 */

@Component({  // -> Decorators
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-basic';
  currentIndex: number = 0;
}
