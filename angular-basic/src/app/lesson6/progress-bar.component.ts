import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";

/**
 *  @Input() là một decorator được sử dụng để truyền dữ liệu từ component cha (parent component)
 *  sang component con (child component). Nó cho phép component con nhận dữ liệu từ component cha
 *  và sử dụng dữ liệu đó trong logic hoặc template của nó.
 */

// Child component

@Component({
  selector: 'progress-bar',
  template: `
    <div style="margin-top: 20px">
      <div class="progress-bar-container" [style.backgroundColor]="backgroundColor">
        <div class="progress"
             [style]="{
          backgroundColor: progressColor,
          width: progress + '%'
        }">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .progress-bar-container, .progress {
      height: 20px;
    }

    .progress-bar-container {
      width: 100%;
    }
  `,
  ],
})
export class ProgressBarComponent implements OnInit, OnChanges {
  // khai báo cho Angular component sẽ có thể nhận vào 3 properties với giá trị mặc định và thay đổi từ component cha
  private _progress = 50;
  @Input() backgroundColor = '#cccccc';
  @Input() progressColor = '#4caf50';

  // - khi khởi tạo một instance của class thì nó sẽ được tự động chạy, và chỉ chạy duy nhất một lần
  // - hạn chế code ở constructor, constructor làm càng ít nhiệm vụ càng tôt,
  constructor() {
    // console.log('constructor', {
    //   progress: this.progress,
    //   backgroundColor: this.backgroundColor,
    //   progressColor: this.progressColor,
    // });
  }

  // - ngOnChanges sẽ chạy lại mỗi khi có một input nào bị thay đổi, nó sẽ được tự động gọi bởi Angular
  // - ngOnChanges chạy trước ngOnInit khi mà có giá trị Input được truyền vào, còn ko sẽ không chạy
  // - ngOnChanges sẽ chạy lại mỗi khi có một input nào bị thay đổi, nó sẽ được tự động gọi bởi Angular, do đó ta có thể validate
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('ngOnChanges', {
    //   progress: this.progress,
    //   backgroundColor: this.backgroundColor,
    //   progressColor: this.progressColor,
    // });

    // validate with ngOnChanges
    if ('progress' in changes) {
      if (typeof changes['progress'].currentValue !== 'number') {
        const progress = Number(changes['progress'].currentValue);
        if (Number.isNaN(progress)) {
          this._progress = 0;
        } else {
          this._progress = progress;
        }
      }
    }
  }

  // - ngOnInit là một life-cycle method, nó sẽ được Angular tự động gọi khi component được khởi tạo,
  // sau khi constructor chạy và sau khi các input đã được binding.
  // - ngOnInit chỉ chạy 1 lần duy nhất, sẽ dễ dàng validate lần đầu tiên ở trong ngOnInit, nhưng ở các lần sau
  // ngOnInit ko chạy => ko nên dùng để validate
  ngOnInit(): void {
    // console.log('ngOnInit', {
    //   progress: this.progress,
    //   backgroundColor: this.backgroundColor,
    //   progressColor: this.progressColor,
    // });
  }

  // Trong trường hợp không thích dùng ngOnChanges để validate, có thể sử dụng getter/setter để làm điều này.
  get progress() {
    return this._progress;
  }
  @Input() set progress(value: number) {
    if (typeof value !== 'number') {
      const progress = Number(value); // nếu chuyển được -> number sẽ trả về NaN
      if (Number.isNaN(progress)) {
        this._progress = 0;
      } else {
        this._progress = progress;
      }
    } else {
      this._progress = value;
    }
    console.log('Set progress', value);
  }
}
