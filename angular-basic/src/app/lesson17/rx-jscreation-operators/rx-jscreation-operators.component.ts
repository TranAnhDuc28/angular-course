import {Component, OnInit} from '@angular/core';
import {defer, from, fromEvent, fromEventPattern, interval, of, throwError, timer} from "rxjs";

@Component({
  selector: 'app-rx-jscreation-operators',
  template: ``,
  styles: []
})
export class RxJSCreationOperatorsComponent implements OnInit {

  ngOnInit(): void {
    const observer = {
      next: (val: any) => console.log(val),
      error: (err: any) => console.log(err),
      complete: () => console.log('complete'),
    };

    /** of()
     * là operator dùng để tạo 1 Observable từ bất cứ giá trị gì: primitives, Array, Object, Function v.v...
     * of() sẽ nhận vào các giá trị và sẽ complete ngay sau khi tất cả các giá trị truyền vào được emit.
     */
    // of('Hello').subscribe(observer); // output => 'Hello'
    // of(1).subscribe(observer); // output => 1
    // of(true).subscribe(observer); // output => true
    // of([1, 2, 3]).subscribe(observer); // output => [1, 2, 3]
    // of({foo: 'bar'}).subscribe(observer); // output => {foo: 'bar'}
    // of(Promise.resolve('Hello')).subscribe(observer); // output => Promise {...}
    // of(1, 2, 3, 'hello', 'world', { foo: 'bar' }, [4, 5, 6]).subscribe(observer); // output => 1, 2, 3, 'hello', 'world', {foo: 'bar'}, [4, 5, 6]


    /** from()
     * cũng gần giống với of(), cũng được sử dụng để tạo Observable từ 1 giá trị.
     * Tuy nhiên, điểm khác biệt đối với of() là from() chỉ nhận vào giá trị là một Iterable hoặc là một Promise
     */
    // from(Promise.resolve('Hello world')).subscribe(observer); // output => Hello world
    // from([1, 2, 3]).subscribe(observer); // output => 1, 2, 3
    // from('Hello world').subscribe(observer); // output => 'H', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'
    // // Map
    // const map: Map<any, any> = new Map();
    // map.set(1, 'hello');
    // map.set(2, 'bye');
    // from(map).subscribe(observer); // output =>  [1, 'hello'], [2, 'bye']
    // // Set
    // const set: Set<number> = new Set();
    // set.add(1);
    // set.add(2);
    // from(set).subscribe(observer); // output => 1, 2

    /** fromEvent()
     * fromEvent() được dùng để chuyển đổi 1 sự kiện (Event) sang Observable
     * Chú ý:
     * - fromEvent() sẽ tạo 1 Observable không tự complete
     * - phải chủ động unsubscribe các Observable tạo từ fromEvent() này nếu không muốn bị tràn bộ nhớ (memory leak).
     */
    // fromEvent(document, 'click').subscribe(console.log);


    /** fromEventPattern()
     * fromEventPattern() là 1 dạng nâng cao của fromEvent(), cũng giống với fromEvent() là tạo Observable từ sự kiện.
     * Tuy nhiên, fromEventPattern() rất khác với fromEvent() về cách dùng, cũng như loại sự kiện để xử lý.
     * fromEventPattern() nhận vào 3 giá trị: addHandler, removeHandler, và projectFunction với projectFunction là optional
     * fromEventPattern() cung cấp cho các 1 API để có thể chuyển đổi các sự kiện từ API gốc của sự kiện.
     */
    fromEventPattern(
      (handler) => {
        document.addEventListener('click', handler);
      }, // addHandler
      (handler) => {
        document.removeEventListener('click', handler);
      }, // removeHandler
      (ev: MouseEvent) => ev.offsetX + ' ' + ev.offsetY // projectFunction
    ).subscribe(observer);


    /** interval()
     * là hàm để tạo Observable mà sẽ emit giá trị số nguyên từ số 0 theo 1 chu kỳ nhất định. Hàm này giống với setInterval.
     * không tự động complete cho nên các bạn phải xử lý việc unsubscribe.
     */
    // interval(1000).subscribe(observer);


    /** timer() <=> setTimeout()
     * timer() có 2 cách sử dụng:
     * - Tạo Observable mà sẽ emit giá trị sau khi delay 1 khoảng thời gian nhất định. Cách dùng này sẽ tự complete nhé.
     * - Tạo Observable mà sẽ emit giá trị sau khi delay 1 khoảng thời gian và sẽ emit giá trị sau mỗi chu kỳ sau đó.
     * Cách dùng này tương tự với interval() nhưng timer() hỗ trợ delay trước khi emit.
     * Vì cách dùng này giống với interval() nên sẽ không tự complete.
     */
    // output: sau 1 giây -> 0
    // complete: 'complete'
    // timer(1000).subscribe(observer);

    // output: sau 1 giây -> 0, 1, 2, 3, 4, 5 ...
    // timer(1000, 1000).subscribe(observer);


    /** throwError()
     * - throwError() sẽ dùng để tạo Observable mà thay vì emit giá trị, Observable này sẽ throw 1 error ngay lập tức sau khi subscribe.
     * - thường dùng trong việc xử lý lỗi của 1 Observable, sau khi xử lý lỗi, chúng ta muốn throw tiếp error cho
     * ErrorHandler tiếp theo, chúng ta sẽ dùng throwError. Khi làm việc với Observable,có 1 số operators yêu cầu
     * các bạn phải cung cấp 1 Observable (ví dụ như switchMap, catchError) thì việc throwError trả về 1 Observable là rất thích hợp.
     */
    throwError(() => 'error').subscribe(observer);


    /** defer()
     * defer() nhận vào 1 ObservableFactory và sẽ trả về Observable này. Điểm đặc biệt của defer() là
     * ở việc defer() sẽ dùng ObservableFactory này để tạo 1 Observable mới cho mỗi Subscriber
     * Ví dụ trường hợp chúng ta cần retry 1 Observable nào đó mà cần so sánh với 1 giá trị random
     * để quyết định xem có chạy tiếp hay không, thì defer() (kết hợp với retry) là 1 giải pháp cực kỳ hiệu quả.
     */
    const random$ = defer(() => of(Math.random()));
    random$.subscribe(observer);
    random$.subscribe(observer);
    random$.subscribe(observer);

    // use case của defer trong project thực tế
    // defer(() => {
    //   if (userId) return this.service.updateUser(userId);
    //   return this.service.createUser();
    // })
  }
}
