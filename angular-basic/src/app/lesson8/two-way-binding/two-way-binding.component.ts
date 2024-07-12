import {Component, VERSION} from '@angular/core';

/**
 * - Two-way binding trong Angular là một cơ chế để đồng bộ hóa dữ liệu giữa component và template.
 * -> Có nghĩa là khi dữ liệu thay đổi trong component, nó cũng sẽ tự động cập nhật trong template và ngược lại.
 * - Angular cung cấp cú pháp đặc biệt cho hai chiều binding này thông qua [(ngModel)].
 */

@Component({
  selector: 'app-two-way-binding',
  templateUrl: './two-way-binding.component.html',
  styleUrls: ['./two-way-binding.component.css']
})
export class TwoWayBindingComponent {
  name = 'Angular ' + VERSION.major;
  isChecked = true;
}
