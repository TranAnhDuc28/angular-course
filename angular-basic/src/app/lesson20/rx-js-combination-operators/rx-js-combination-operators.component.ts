import {Component, OnInit} from '@angular/core';
import {
  catchError,
  combineLatest,
  concat,
  delay, endWith,
  forkJoin, from,
  fromEvent,
  interval,
  map,
  merge,
  Observable,
  of, pairwise,
  pipe, race,
  repeat, startWith,
  take, withLatestFrom,
  zip
} from "rxjs";

@Component({
  selector: 'rx-js-combination-operators',
  template: `
    <b>rx-js-combination-operators</b>
  `,
  styleUrls: []
})
export class RxJsCombinationOperatorsComponent implements OnInit {

  ngOnInit(): void {
    const observer = {
      next: (val: any) => console.log(val),
      error: (err: any) => console.log(err),
      complete: () => console.log('complete'),
    };


    /** forkJoin()
     * - forkJoin() sẽ là 1 operator cực kỳ quen thuộc vì xét về công dụng thì forkJoin() tương đương với Promise.all().
     * - forkJoin() nhận vào tham số là 1 list các Observables theo dạng Array hoặc Dictionary (Object) (children).
     * Khi các children Observables complete hết thì forkJoin() sẽ emit giá trị của các children Observables
     * theo dạng Array hoặc Dictionary (tuỳ vào tham số truyền vào) rồi sau đó sẽ complete.
     *
     * - Lưu ý:
     * + chỉ emit khi các children Observables complete. Nếu như 1 trong số các children Observables không complete,
     * forkJoin() sẽ không bao giờ emit.
     * + forkJoin() sẽ throw error khi 1 trong các children Observables throw error, và giá trị của các
     * children Observables đã complete khác sẽ bị nuốt mất nếu như các bạn không xử lý error hợp lý.
     */
    // forkJoin([
    //     of('hello').pipe(delay(1000)),
    //     of('world').pipe(delay(2000)),
    //     of('!!!').pipe(delay(3000))
    //   ]).subscribe(observer); // output: sau 3s -> ['hello', 'world', '!!!'] -> 'complete'
    //
    // forkJoin({
    //     one: of(1),
    //     hello: of('hello'),
    //     foo: of({ foo: 'bar' })
    //   }).subscribe(observer); // output: { one: 1, hello: 'hello', foo: { foo: 'bar' } } -> 'complete'

    /** Use-case:
     * - forkJoin() sử dụng rất nhiều trong ứng dụng Angular, đặc biệt là khi bạn cần request cùng lúc một loạt các Dropdown/Select.
     *
     * forkJoin([
     *   this.apiService.getAccountDropdown(),
     *   this.apiService.getDepartmentDropdown(),
     *   this.apiService.getStoreDropdown(),
     * ]).subscribe(observer); // output: [accountList, departmentList, storeList] -> 'complete'
     *
     * - forkJoin() khi dùng với children Observables là 1 Array, thì forkJoin() có thể nhận vào 1 tham số thứ 2
     * gọi là projectFunction. projectFunction này sẽ được gọi với các tham số là giá trị của children Observables
     * và kết quả của projectFunction sẽ là kết quả emit của forkJoin(). projectFunction chỉ được thực thi
     * nếu như forkJoin() SẼ emit (nghĩa là tất cả children Observables đều complete).
     *
     * forkJoin([
     *     this.apiService.getAccountDropdown(),
     *     this.apiService.getDepartmentDropdown(),
     *     this.apiService.getStoreDropdown(),
     *   ]
     * ).pipe(
     *    map((accountList, departmentList, storeList) => {
     *     return {
     *       accounts: accountList,
     *       departments: departmentList,
     *       stores: storeList,
     *     };
     *   })
     * ).subscribe(observer); // output: { accounts: [...], departments: [...], stores: [...] } -> 'complete'
     *
     */

    /////////////////////////////////////////////////////////////////

    /** combineLatest()
     * - combineLatest() giống với forkJoin() là cũng sẽ nhận vào tham số là 1 Array<Observable>.
     * Khác với forkJoin() là combineLatest() không nhận vào Dictionary (Object) và combineLatest()
     * sẽ emit khi TẤT CẢ các children Observables emit ít nhất một lần, nghĩa là các children Observables
     * không cần phải complete mà chỉ cần emit ít nhất 1 giá trị thì combineLatest() sẽ emit giá trị
     * là Array gồm tất cả các giá trị được children Observables emit, theo thứ tự.
     * - Thay vì truyền vào Array<Observable> cho combineLatest() như sau: combineLatest([obs1, obs2]),
     * cũng có thể truyền vào mà ko cần [] như: combineLatest(obs1, obs2). Cả 2 cách đều cho ra kết quả
     * như nhau, tuy nhiên, RxJS khuyên dùng cách 1 hơn vì nó nhất quán với forkJoin() hơn
     * và cũng dễ dự đoán được kết quả hơn, vì kết quả của combineLatest() là 1 Array.
     * Vì vậy, mình chỉ đề cập đến cách dùng combineLatest([obs1, obs2])
     */
    // combineLatest([
    //   interval(2000).pipe(map((x) => `First: ${x}`)), // {1}
    //   interval(1000).pipe(map((x) => `Second: ${x}`)), // {2}
    //   interval(3000).pipe(map((x) => `Third: ${x}`)), // {3}
    // ]).subscribe(observer);
    /** output:
     * sau 3s, vì interval(3000) có khoảng thời gian dài nhất:
     * [First 0, Second 2, Third 0] -- vì sao? vì tại 3s, thì {2} đã emit đc 3 lần rồi (3s, mỗi giây nhảy từ 0 -> 1 -> 2)
     *
     * sau 1s kế tiếp: (giây thứ 4)
     * [First 1, Second 2, Third 0] -- vì sao? vì lúc này là giây thứ 4, {1} đã emit đc 2 lần (4s, mỗi 2 giây nhảy từ  0 -> 1)
     * [First 1, Second 3, Third 0] -- vì sao? vì lúc này là giây thứ 4, {2} đã emit đc lần thứ 4 (0 -> 1 -> 2 -> 3)
     *
     * sau 1s kế tiếp: (giây thứ 5)
     * [First 1, Second 4, Third 0] -- {2} emit lần thứ 5
     *
     * sau 1s kế tiếp: (giây thứ 6)
     * [First 2, Second 4, Third 0] -- {1} emit lần thứ 3
     * [First 2, Second 5, Third 0] -- {2} emit lần thứ 6
     * [First 2, Second 5, Third 1] -- {3} emit lần thứ 2
     */
    /** Lưu ý
     * - Qua ví dụ, các bạn cũng có thể thấy là combineLatest(), sau lần emit đầu tiên của các children Observables,
     * thì sẽ emit giá trị mới nhất của child Observable đang emit + giá trị gần nhất của các children Observables đã emit.
     * - Cũng qua ví dụ, các bạn có thể thấy là Observable thứ 2 {2} (interval(1000)) bị nuốt mất
     * 2 giá trị đầu tiên là 0 và 1 vì {2} đã emit với tần suất nhanh hơn là Observable có khoảng thời gian lâu nhất {3}.
     * Đây là điều các bạn cần lưu ý để có thể tránh hiện tượng racing condition.
     * - combineLatest() sẽ complete khi tất cả children Observables complete.
     * - combineLatest() sẽ không bao giờ complete nếu như 1 trong số các children Observables không bao giờ complete.
     * - combineLatest() sẽ throw error nếu như 1 trong số các children Observables throw error
     * và giá trị của các children Observables đã emit khác sẽ bị nuốt (behavior này giống với forkJoin())
     */

    /////////////////////////////////////////////////////////////////

    /** zip()
     * - nhận vào tham số là ...(Observables | Function) để tượng trưng cho các child Observable được truyền vào lần lượt.
     * zip() là 1 operator khá hay ho vì zip() sẽ gom tất cả các giá trị được emit bởi children Observable theo cặp.
     * - zip() sẽ complete khi 1 trong các children Observables complete. Nghĩa là chỉ luôn luôn nhận được
     * giá trị đã được gộp lại của zip.
     * - zip() sẽ throw error nếu 1 trong các children Observables throw error.
     * - Nếu tham số cuối cùng của zip() là 1 Function thì zip() sẽ coi tham số này là projectFunction.
     * Cách thức hoạt động hoàn toàn giống với projectFunction của combineLatest() và forkJoin().
     */
    // zip(
    //   of(1, 2, 3),
    //   of(4, 5, 6),
    //   of(7, 8, 9)
    // ).subscribe(observer);
    /** output:
     * [1, 4, 7]; // 3 số đầu tiên ở từng observable
     * [2, 5, 8]; // 3 số tiếp theo
     * [3, 6, 9]; // 3 số cuối cùng
     * */

    // zip(
    //   of(1, 2, 3, 99),
    //   of(4, 5, 6),
    //   of(7, 8, 9)
    // ).subscribe(observer);
    /** output:
     * [1, 4, 7]; // 3 số đầu tiên ở từng observable
     * [2, 5, 8]; // 3 số tiếp theo
     * [3, 6, 9]; // 3 số cuối cùng
     * 99 của observable đầu tiên sẽ bị bỏ qua vì observable thứ 2 và thứ 3 đã complete mất rồi.
     */

    /**
     * Use-case:
     */

      // Giá trị cuối cùng mà bạn cần được cung cấp bởi nhiều Observables khác nhau. Ví dụ:
    // const age$: Observable<number> = of(29, 28, 30);
    // const name$: Observable<string> = of('Chau', 'Trung', 'Tiep');
    // const isAdmin$: Observable<boolean> = of(true, false, true);
    //
    // zip(age$, name$, isAdmin$).subscribe(observer); // output: []
    //
    // zip(age$, name$, isAdmin$).pipe(
    //   map(([age, name, isAdmin]) => {
    //       return {age, name, isAdmin};
    //     }
    //   )
    // ).subscribe(observer);
    /** output: -> object
     * { age: 29, name: 'Chau', isAdmin: true }
     * { age: 28, name: 'Trung', isAdmin: false }
     * { age: 30, name: 'Tiep', isAdmin: true }
     */

    // Kết hợp giá trị của 2 Observables khác nhau ở 2 thời điểm khác nhau.
    // Ví dụ: muốn biết toạ độ chuột của người dùng từ lúc họ mousedown cho đến lúc họ mouseup,
    // hoặc có thể lấy khoảng thời gian họ rê chuột (dùng new Date() thay vì getCoords() như ví dụ bên dưới)
    // const log = (event: any, val: any) => `${event}: ${JSON.stringify(val)}`;
    // const getCoords = pipe(
    //   map((e: MouseEvent) => ({ x: e.clientX, y: e.clientY }))
    // );
    // const documentEvent = (eventName: string) => {
    //   return fromEvent<MouseEvent>(document, eventName).pipe(getCoords);
    // };
    //
    // zip(
    //   documentEvent('mousedown'),
    //   documentEvent('mouseup')
    // ).subscribe((e) =>
    //   console.log(`${log('start', e[0])} ${log('end', e[1])}`, e)
    // );
    /** output: -> object
     * start: {"x":291,"y":136} end: {"x":143,"y":168}
     * start: {"x":33,"y":284} end: {"x":503,"y":74}
     */

    /////////////////////////////////////////////////////////////////////////

    /** concat()
     * - nhận vào tham số ...Observable để tượng trưng cho các child Observable được truyền vào lần lượt
     * thay vì truyền vào 1 Array<Observable>.
     * - concat() sẽ subscribe vào các children Observables theo thứ tự được truyền vào và sẽ emit
     * khi Observable đang được subscribe complete (gọi là {1}).
     * + Nếu {1} emit và complete, concat() sẽ emit giá trị mà {1} emit rồi sẽ subscribe vào Observable kế tiếp.
     * + Nếu {1} error, concat() sẽ error ngay lặp tức và chuỗi Observable phía sau sẽ bị bỏ qua.
     * + Nếu {1} complete mà không emit, concat() sẽ bỏ qua và subscribe vào Observable kế tiếp
     * + Nếu {1} emit và không complete, concat() sẽ emit giá trị mà {1} emit NHƯNG sẽ không subscribe vào
     * Observable kế tiếp vì {1} không complete.
     * - concat() sẽ hoạt động tương tự cho LẦN LƯỢT từng children Observables cho đến khi không còn Observable
     * nào thì concat() sẽ complete.
     */
    // concat(
    //   interval(1000).pipe(take(3)),
    //   interval(500).pipe(take(2)),
    // ).subscribe(observer);
    /** output:
     * mỗi 1s -> 0, 1, 2
     * mỗi 0.5s -> 0, 1
     * => kq: 0, 1, 2, 0, 1 -> 'complete'
     */

    //  truyền 1 Observable nhiều lần vào cho concat().Ví dụ:
    // const fiveSecondTimer = interval(1000).pipe(take(5));
    // concat(fiveSecondTimer, fiveSecondTimer, fiveSecondTimer).subscribe(observer); // output: 0,1,2,3,4 - 0,1,2,3,4 - 0,1,2,3,4 -> 'complete'
    // dùng repeat()
    // concat(fiveSecondTimer.pipe(repeat(3))).subscribe(observer); // output: 0,1,2,3,4 - 0,1,2,3,4 - 0,1,2,3,4 -> 'complete'


    ///////////////////////////////////////////////////////////////////////

    /** merge()
     * - nhận vào tham số ...(Observable | number) để tượng trưng cho các child Observable được truyền
     * vào lần lượt thay vì truyền vào 1 Array<Observable>. Khác với concat(), merge() không quan tâm đến thứ tự
     * mà các children Observables emit cho nên merge() không bị giới hạn bởi việc các Observable con phải complete
     * thì Observable kế tiếp mới được subscribe. Tham số cuối cùng của merge() nếu là 1 number, thì merge() sẽ coi
     * tham số đó là số concurrent. concurrent xác định số lượng children Observables mà merge() sẽ subscribe
     * song song (concurrently). Default thì merge() sẽ subscribe vào TẤT CẢ children Observables song song.
     * - merge() sẽ subscribe vào tất cả (phụ thuộc vào tham số concurrent nếu được truyền vào) các children Observables và sẽ:
     * + emit giá trị mà bất cứ Observable nào emit.
     * + throw error nếu 1 trong children Observables throw error
     * + complete khi và chỉ khi tất cả children Observables complete.
     */
    // merge(
    //   interval(1000).pipe(take(3), map(x => `first ${x}`)),
    //   interval(500).pipe(take(2),  map(x => `second ${x}`))
    // ).subscribe(observer);
    /** Use-case:
     * Trong Angular, merge() có thể được sử dụng khi các bạn có 1 FormGroup và các bạn muốn lắng nghe vào từng
     * FormControl.valueChanges để thực hiện 1 nghiệp vụ nào đó. Lúc này, các bạn không hề quan tâm thứ tự việc
     * FormControl nào sẽ thay đổi, các bạn chỉ cần quan tâm là nếu FormControl đó thay đổi thì sẽ xử lý hợp lý.
     *
     * const formControlValueChanges = Object.keys(this.formGroup.value).map((key) =>
     *   this.formGroup.get(key).valueChanges.pipe(map((value) => ({ key, value })))
     * ); // ví dụ từ {firstName: 'Chau', lastName: 'Tran'} -> [Observable<{key, value}>, Observable<{key, value}>]
     * merge(...formControlValueChanges).subscribe(({key, value}) => {
     *   if (key === 'firstName') {...};
     *   if (key === 'lastName') {...};
     * });
     */

    /////////////////////////////////////////////////////////////////////////////

    /** race()
     * race() có tham số giống như merge() và concat()
     * + race() sẽ emit giá trị của Observable nào emit đầu tiên (nhanh nhất) sau đó lặp lại cho đến khi 1 trong các children Observables complete.
     * + race() sẽ error ngay lập tức nếu Observable nhanh nhất lại throw error thay vì emit giá trị.
     */
    // race(
    //   interval(1000).pipe(take(3), map(x => `first ${x}`)),
    //   interval(500).pipe(take(2),  map(x => `second ${x}`))
    // ).subscribe(observer);
    /**
     * Use-case:
     * Ở một ứng dụng bất kỳ, lâu lâu sẽ phải hiển thị 1 Banner nào đó dựa vào hành động của người dùng.
     * Ví dụ: Người dùng vừa submit 1 form, bạn hiển thị 1 Banner (ng-ant-zorro Alert) báo người dùng là
     * họ submit thành công, hoặc họ có gặp lỗi. Nghiệp vụ lúc này muốn Banner này sẽ tắt đi khi 1 trong 3 điều kiện sau
     * được thoả mãn:
     * + Sau khi hiển thị được 10s
     * + Người dùng click đóng Banner
     * + Người dùng navigate sang một page khác.
     * => Lúc này, operator thích hợp nhất chính là race()
     *
     * race(
     *   timer(10000), // timer 10 second
     *   this.userClick$, // user click event
     *   this.componentDestroy$ // navigate -> ngOnDestroy
     * )
     *   .pipe(takeUntil(this.componentDestroy$)) // sẽ ko muốn lắng nghe vào race nữa nếu như componentDestroy$
     *   .subscribe(() => this.closeBanner());
     */


    //////////////////////////////////////////////////////////////////////////////////
    // Các operators sau sẽ là các pipeable operator, nghĩa là các operator sau đây đều được dùng với pipe()
    // và sẽ được bao bên ngoài 1 Observable gọi là Outer Observable.
    //////////////////////////////////////////////////////////////////////////////////


    /** withLatestFrom()
     * - nhận vào tham số là 1 Observable. withLatestFrom() sẽ gộp giá trị emit của Outer Observable
     * với giá trị gần nhất của tham số Observable thành 1 Array rồi emit Array này.
     * - withLatestFrom() cũng nhận vào tham số thứ 2 optional là projectFunction
     */
    // const withLatestFrom$ = interval(2000).pipe(
    //   map((x) => `Need last from thia value: ${x}`));
    // fromEvent(document, 'click').pipe(withLatestFrom(withLatestFrom$)).subscribe(observer);

    /** Use-case
     * Vì tính chất chỉ emit khi Outer Observable emit nên withLatestFrom() sẽ phù hợp với những nghiệp vụ
     * mà cần lắng nghe 1 Observable (đây là Outer Observable) và cần thêm giá trị gần nhất của 1 Observable khác.
     * Nếu dùng combineLatest() thì mỗi lần Observable khác kia emit, thì combineLatest() cũng emit
     * và đây là điều chúng ta không muốn.
     *
     * this.apiService.getSomething().pipe(withLatestFrom(this.currentLoggedInUser$));
     * // các bạn gọi một API và các bạn muốn dùng kết quả của API này + với thông tin của người dùng đang đăng nhập để thực hiện nghiệp vụ ké tiếp
     */


    ////////////////////////////////////////////////////////////////////////

    /** startWith()
     * - là 1 operator rất dễ hiểu. startWith() nhận vào 1 list các tham số.
     * - startWith() sẽ làm cho cả Observable emit giá trị của startWith() trước rồi mới emit đến giá trị
     * của Outer Observable. startWith() sẽ emit giá trị ngay lặp tức mà không phụ thuộc vào việc Outer Observable
     * có emit hay là chưa.
     */
    // of('world').pipe(startWith('Hello')).subscribe(observer);

    /** Use-case
     * startWith() có thể được dùng trong Angular để cung cấp giá trị ban đầu cho các API call. Ví dụ:
     *
     * this.books$ = this.apiService.getBooks().pipe(startWith([]));
     *
     * <ng-container *ngIf="books$ | async as books">
     *   <!-- vì books$ đã có startWith([]) nên giá trị của books sẽ là truthy ngay từ đầu,
     *   nên *ngIf này sẽ truthy và render bên trong ng-container ngay
     *   -->
     * </ng-container>
     */


    /////////////////////////////////////////////////////////////

    /** endWith()
     * - Cũng nhận vào 1 list các tham số như startWith() nhưng cách hoạt động thì ngược lại với startWith().
     * - Một điểm khác biệt lớn là endWith() chỉ emit giá trị của endWith() khi Outer Observable complete mà thôi.
     */
    // of('hi', 'how are you?', 'sorry, I have to go now')
    //   .pipe(endWith('goodbye!')).subscribe(observer);
    // output:
    // 'hi'
    // 'how are you?'
    // 'sorry, I have to go now'
    // 'goodbye!'


    ///////////////////////////////////////////////////////////////////

    /** pairwise()
     * - là 1 operator rất kén nghiệp vụ. pairwise() sẽ gộp giá trị emit gần nhất
     * và giá trị đang được emit của Outer Observable thành 1 Array (1 cặp giá trị) và emit Array này.
     */
    from([1, 2, 3, 4, 5])
      .pipe(
        pairwise(),
        map(([prev, cur]) => prev + cur)
      ).subscribe(observer);
    // output:
    // 3 (1 + 2)
    // 5 (2 + 3)
    // 7 (3 + 4)
    // 9 (4 + 5)

  }


  // example with startWith
  public static getApiResponse<T = any>(apiCall: Observable<T>, initValue: T): Observable<ApiResponse<T>> {
    return apiCall.pipe(
      map((data: T) => ({ data: data, isLoading: false, error: ''})),
      startWith({data: initValue, isLoading: true, error: ''}),
      catchError((error: any) => of({ data: initValue, isLoading: false, error: error.message()}))
    );
  }

}

interface ApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: string;
}
