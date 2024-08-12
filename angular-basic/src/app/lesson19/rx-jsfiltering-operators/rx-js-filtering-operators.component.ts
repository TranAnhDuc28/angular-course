import {Component, Directive, OnDestroy, OnInit} from '@angular/core';
import {
  asyncScheduler,
  auditTime, debounceTime,
  defaultIfEmpty, distinct, distinctUntilChanged, distinctUntilKeyChanged,
  filter,
  find,
  first,
  from, fromEvent,
  interval,
  last, map,
  of, pluck, sampleTime,
  single, skip, skipUntil, skipWhile, Subject,
  take,
  takeLast,
  takeUntil, takeWhile, throttleTime,
  timer
} from "rxjs";

@Component({
  selector: 'rx-js-filtering-operators',
  template: `
    <b>RxJS Filtering Operators</b>
    <br>
    <br>
    <input type="text" id="queryInput">
  `,
  styles: []
})
export class RxJsFilteringOperatorsComponent implements OnInit {

  ngOnInit(): void {

    /** Filtering Operators
     * các operators này được dùng để lược/lọc các giá trị được emit từ Observable gốc,
     * giống như lược/lọc qua phần tử của 1 Array vậy.
     */

    const items = [1, 2, 4, 5, 6, 7, 8];

    const observer = {
      next: (val: any) => console.log(val),
      error: (err: any) => console.log(err),
      complete: () => console.log('complete'),
    };

    /** filter()
     *  sẽ nhận vào 1 predicate là 1 function mà function này phải trả về giá trị truthy hoặc falsy.
     *  Nếu như truthy thì filter() sẽ emit giá trị của Observable tại thời điểm đó.
     *  Ngược lại nếu như falsy, thì filter() sẽ không emit giá trị đó. Cách hoạt động giống như Array.prototype.filter().
     */
    // console.log(items.filter(item => item % 2 === 0)); // Array.prototype.filter()
    // from(items).pipe(
    //   filter((item: number) => item % 2 === 0)
    // ).subscribe(observer);

    /** first()
     *  - sẽ emit giá trị đầu tiên của 1 Observable rồi complete.
     *  - sẽ throw EmptyError nếu như Observable tự complete trước khi emit 1 giá trị nào
     *  (ví dụ như EMPTY chẳng hạn, là 1 Observable rỗng. Hoặc of() mà không nhận vào giá trị nào).
     *  - first() còn có thể nhận vào 2 tham số optional: predicate và defaultValue.
     *  + Nếu như truyền vào predicate thì first() sẽ throw Error nếu như Observable đã complete mà chưa có giá trị
     *  nào thoả được điều kiện của predicate.
     *  + Nếu như bạn truyền vào predicate và không muốn có Error thì hãy truyền thêm vào defaultValue.
     */
    // from(items).pipe(first()).subscribe(observer); // output: 1 -> complete
    // from(items).pipe(first((item: number) => item > 4)).subscribe(observer); // output: 5 -> complete
    // from(items).pipe(first((item: number) => item > 9)).subscribe(observer); // output: throw EmptyError
    // of().pipe(first((item: number) => item > 9)).subscribe(observer); // output: throw EmptyError
    // from(items).pipe(
    //   first((item: number) => item > 9,
    //     -1) // with default value
    // ).subscribe(observer); -> complete


    /** last()
     * - Hoàn toàn ngược lại với first(), last() sẽ emit giá trị cuối cùng của Observable trước khi Observable này complete.
     * Tất các behaviors mà first() có thì last() cũng có. Nghĩa là:
     * + Throw EmptyError nếu như Observable tự complete trước khi emit bất kỳ 1 giá trị nào.
     * + Cũng nhận vào 2 tham số optional: predicate và defaultValue.
     * + Throw Error nếu như chỉ có predicate và không có giá trị nào thoả điều kiện.
     * + Emit defaultValue nếu như có predicate và defaultValue và không có giá trị nào thoả điều kiện.
     */
    // from(items).pipe(last()).subscribe(observer); // output: 8 -> complete
    // from(items).pipe(last((item: number) => item > 4)).subscribe(observer); // output: 8 -> complete
    // from(items).pipe(last((item: number) => item > 9)).subscribe(observer); // output: throw Empty


    /** find()
     * Giống như Array.prototype.find(), find() sẽ emit giá trị đầu tiên mà thoả mãn được điều kiện từ predicate rồi complete.
     * Khác với first(), find() phải có predicate và find() sẽ không emit Error nếu như không có giá trị nào thoả mãn điều kiện.
     */
    // from(items).pipe(find((item: number) => item % 2 !== 0)).subscribe(observer); // output: 1 -> complete
    // from(items).pipe(find((item: number) => item > 9)).subscribe(observer); // output: undefined -> complete


    /** single()
     * Hoạt động tương tự như first() nhưng nghiêm ngặt hơn first() ở điểm single() sẽ throw Error
     * nếu như có NHIỀU HƠN 1 giá trị thoả điều kiện. single() không nhận vào defautlValue
     * và sẽ emit undefined nếu như không có giá trị nào thoả điều kiện khi truyền vào tham số predicate.
     * Phần lớn single() chỉ nên sử dụng khi có điều kiện predicate cần phải thoả mãn.
     * Nếu dùng single() lên 1 Observable emit nhiều hơn 1 giá trị, single() sẽ throw Error.
     */
    // from(items).pipe(single())
    //   .subscribe(observer); // error: Error -> nhiều hơn 1 giá trị được emit từ from() và single() không có điều kiện gì.
    // from(items).pipe(single((item: number) => item > 1))
    //   .subscribe(observer); // error: Error -> có nhiều hơn 1 giá trị > 1.
    // from(items).pipe(single((item: number) => item === 1))
    //   .subscribe(observer); // output: 1 -> complete


    /** take()
     * nhận vào 1 tham số count để dùng cho số lần lấy giá trị được emit từ Observable sau đó sẽ complete.
     * - TH đặc bệt: take(1) khác first() ở chỗ take(1) sẽ không throw bất cứ error nào nếu như
     * Observable tự complete mà không emit giá trị nào.
     * - take(1) nên dùng khi cần:
     * + Báo cáo user click ở đâu khi vào page đầu tiên?
     * + Snapshot của data tại 1 thời điểm
     * + Route Guard mà return Observable
     */
    // from(items).pipe(take(3)).subscribe(observer); // output: 1, 2, 4 -> complete


    /** takelast()
     * hoạt động giống như take() nhưng ngược lại với take() là takeLast() sẽ lấy n giá trị cuối cùng được emit từ Observable.
     * Chú ý là takeLast() chỉ emit khi nào Observable gốc complete, nếu như Observable gốc là 1 long-live Observable
     * (ví dụ: interval()) thì takeLast() sẽ không bao giờ emit.
     */
    // from(items).pipe(takeLast(2)).subscribe(observer); // output: 7, 8 -> complete
    // interval(1000).pipe(takeLast(2)).subscribe(observer); // output: -> không bao giờ emit.


    /** takeUntil()
     * - nhận vào 1 tham số là 1 Observable như là 1 notifier (người báo hiệu) và takeUntil() sẽ emit
     * giá trị của Observable gốc CHO TỚI KHI notifier emit.
     * ** Use-case trong Angular:
     * takeUntil() được dùng để unsubscribe Observable trong ngOnDestroy() là rất phổ biến.
     * Mình có 1 destroySubject: Subject<void> tượng trưng cho notifier. Khi ngOnDestroy() thực thi,
     * chúng ta sẽ cho destroySubject.next() (emit) và sử dụng takeUntil(this.destroySubject)
     * thì Observable trong Component sẽ được unsubscribe khi ngOnDestroy() thực thi -> khi Component unmount.
     *
     *     @Directive()
     *     export abstract class Destroyable implements OnDestroy {
     *       destroySubject$ = new Subject<void>();
     *
     *       ngOnDestroy(): void {
     *         this.destroySubject$.next();
     *         this.destroySubject$.complete();
     *       }
     *     }
     *
     *     class ComponentAny extends Destroyable {
     *       state$.pipe(
     *         map(),
     *         takeUntil(this.destroySubject$)
     *       ).subscribe();
     *     }
     */
    // interval(1000).pipe(takeUntil(timer(5000))).subscribe(observer); // output: 0, 1, 2, 3, 4 -> sau 5s, timer emit, complete.
    // interval(1000).pipe(takeUntil(fromEvent(document, 'click'))).subscribe(observer); // output: 0, 1, 2, 3, 4 -- click --> 'complete'


    /** takeWhile()
     * - hoạt động tương tự takeUntil(), nhưng thay vì nhận vào 1 notifier thì takeWhile() nhận vào 1 tham số predicate
     * và takeWhile() sẽ emit giá trị của Observable gốc CHO TỚI KHI predicate trả về false.
     * - hoạt động hiệu quả nhất khi bạn muốn unsusbcribe từ chính giá trị mà Observable emit (internal)
     */
    // interval(1000).pipe(takeWhile((x: number) => x < 6)).subscribe(observer);


    /** skip()
     * hoạt động tương tự như take() nhưng mang tính chất ngược lại so với take().
     * Như take() là mình sẽ emit n giá trị ban đầu, còn skip() là mình sẽ bỏ qua n giá trị ban đầu.
     */
    from(items).pipe(skip(5)).subscribe(observer); // output: 7, 8 -> complete


    /** skipUntil()
     * hoạt động tương tự takeUntil() nhận vào 1 tham số là 1 Observable như là 1 notifier
     * và sẽ emit giá trị của Observable gốc CHO TỚI KHI notifier emit và mang tính chất giống với skip().
     */
    // interval(1000).pipe(skipUntil(fromEvent(document, 'click'))).subscribe(observer); // output: click at 5 seconds -> 5, 6, 7, 8, 9....


    /** skipWhile()
     * hoạt động tương tự takeWhile() và mang tính chất giống với skip()
     */
    // interval(1000).pipe(skipWhile((x: number) => x < 5)).subscribe(observer); // output: 6, 7, 8, 9....


    /** distinct()
     * - sẽ so sánh các giá trị được emit từ Observable và chỉ emit các giá trị chưa được emit qua.
     * - có thể nhận vào 1 tham số là hàm keySelector để có thể chọn được property nào cần được so sánh
     * nếu như Observable emit giá trị là 1 complex Object
     */
    // from([1, 2, 3, 4, 5, 5, 4, 3, 6, 1])
    //   .pipe(distinct())
    //   .subscribe(observer); // output: 1, 2, 3, 4, 5, 6 -> complete
    // of({ age: 4, name: 'Foo' }, { age: 7, name: 'Bar' }, { age: 5, name: 'Foo' })
    //   .pipe(distinct((p) => p.name))
    //   .subscribe(observer); // output: { age: 4, name: 'Foo' }, { age: 7, name: 'Bar' } -> complete


    /** distinctUntilChanged()
     * - có concept tương tự distinct() nhưng khác ở chỗ distinctUntilChanged() chỉ so sánh giá trị sắp được emit
     * với giá trị vừa được emit (giá trị cuối) chứ không so sánh với tất cả giá trị đã được emit.
     * - distinctUntilChanged() cũng có thể nhận vào 2 tham số optional: compare function và keySelector function.
     * Tham số keySelector hoạt động giống như tham số keySelector của distinct().
     * Khi compare function không được truyền vào cho distinctUntilChanged() thì distinctUntilChanged()
     * sẽ dùng === để so sánh 2 giá trị. Để thay đổi behavior này, truyền vào compare function,
     * nếu compare function trả về truthy thì distinctUntilChanged sẽ bỏ qua giá trị đó.
     */
    // from([1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4])
    //   .pipe(distinctUntilChanged())
    //   .subscribe(observer); // output: 1, 2, 1, 2, 3, 4 -> complete
    // of(
    //   {age: 4, name: 'Foo'},
    //   {age: 6, name: 'Foo'},
    //   {age: 7, name: 'Bar'},
    //   {age: 5, name: 'Foo'}
    // )
    //   .pipe(distinctUntilChanged((a, b) => a.name === b.name))
    //   .subscribe(observer); // output: { age: 4, name: 'Foo' }, { age: 7, name: 'Bar' }, { age: 5, name: 'Foo' } -> complete


    /** distinctUntilKeyChanged()
     * distinctUntilKeyChanged() là short-cut của distinctUntilChanged() + keySelector.
     */
    // of(
    //   {age: 4, name: 'Foo'},
    //   {age: 6, name: 'Foo'},
    //   {age: 7, name: 'Bar'},
    //   {age: 5, name: 'Foo'}
    // )
    //   .pipe(distinctUntilKeyChanged('name'))
    //   .subscribe(observer); // output: { age: 4, name: 'Foo' }, { age: 7, name: 'Bar' }, { age: 5, name: 'Foo' } -> complete


    /////////////////////////////////////////////////////////////////


    /** throttle()/throttleTime()
     * - throttleTime() nhận vào 1 tham số là duration có đơn vị là millisecond. Khi Observable gốc emit giá trị
     * đầu tiên, throttleTime() sẽ emit giá trị này rồi sẽ chạy timer với duration được truyền vào.
     * Khi timer đang chạy thì mọi giá trị của Observable gốc emit đều được bỏ qua. Khi timer chạy xong,
     * throttleTime() quay lại trạng thái ban đầu và chờ giá trị kế tiếp của Observable gốc.
     * - throttle hoạt động giống như throttleTime nhưng thay vì truyền vào duration thì throttle nhận vào
     * 1 Observable tượng trưng cho durationSelector. Khi durationSelector này emit (hoặc complete) thì timer
     * sẽ ngưng, và throttle sẽ chờ giá trị tiếp theo của Observable gốc và quá trình này được lặp lại.
     * - throttleTime() có thể nhận vào tham số ThrottleConfig: {leading: boolean, trailing: boolean}
     * để xác định xem throttleTime() sẽ emit giá trị đầu hay giá trị cuối khi timer chạy xong.
     * Default là {leading: true, trailing: false}.
     * - throttleTime() thường được sử dụng khi bạn có event từ DOM như mousemove để tránh quá nhiều event được emit.
     */
    // fromEvent(document, 'mousemove')
    //   .pipe(throttleTime(1000, asyncScheduler , {leading: true, trailing: false}))
    //   .subscribe(observer); // output: MouseEvent {} - wait 1s -> MouseEvent {} - wait 1s -> MouseEvent {}


    /** audit()/auditTime()
     * - auditTime() nhận vào 1 tham số duration có đơn vị là milliseconds. auditTime() hoạt động
     * tương tự throttleTime() với {trailing: true}. Nghĩa là sau khi timer chạy và chạy xong duration,
     * auditTime() sẽ emit giá trị gần nhất mà Observable gốc emit.
     */
    // fromEvent(document, 'click')
    //   .pipe(auditTime(1500))
    //   .subscribe(observer); // output: click - wait 1s -> MouseEvent {} -click  wait 1s (trong 1s, click 10 times) -> MouseEvent {} -> click wait 1s -> MouseEvent {}
    // interval(1000)
    //   .pipe(auditTime(1500))
    //   .subscribe(observer);


    /** sample()/sampleTime()
     * nhận vào 1 tham số là period có đơn vị là millisecond. Khi Observable gốc được subscribe,
     * timer của sampleTime() sẽ chạy ngay lập tức và cứ sau mỗi period, sampleTime() sẽ emit giá trị gần nhất của Observable gốc.
     */
    // interval(1000)
    //   .pipe(sampleTime(1500))
    //   .subscribe(observer);


    /** debounce()/debounceTime()
     * nhận vào 1 tham số là dueTime có đơn vị là millisecond. Khi Observable gốc emit giá trị,
     * debounceTime() sẽ bỏ qua giá trị này và sẽ chạy timer với khoảng thời gian dueTime.
     * debounceTime() sẽ bỏ qua tất cả giá trị mà Observable gốc emit trong khi timer vẫn đang chạy
     * và sau đó debounceTime() sẽ chạy lại timer. Khi và chỉ khi timer được chạy hoàn chỉnh khoảng thời gian
     * dueTime, debounceTime() sẽ emit giá trị cuối cùng mà Observable gốc đã emit.
     * => Vì cách hoạt động như trên, debounceTime() được dùng phổ biến nhất cho 1 input dùng để filter 1 danh sách gì đó.
     */
    const queryInput = document.querySelector('#queryInput');
    if (queryInput) {
      fromEvent((queryInput), 'keydown')
        .pipe(
          debounceTime(1500),
          map(ev => (ev.target as HTMLInputElement).value)
        )
        .subscribe(observer);
    }
  }
}
