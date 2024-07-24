import {Component, OnInit} from '@angular/core';
import {
  buffer,
  bufferTime,
  delay,
  fromEvent,
  interval,
  map,
  mapTo,
  merge,
  of,
  pluck,
  reduce,
  scan,
  toArray
} from "rxjs";

@Component({
  selector: 'rx-js-transformation-operators',
  template: '',
  styles: []
})
export class RxJsTransformationOperatorsComponent implements OnInit {

  ngOnInit(): void {
    const users = [
      {
        id: 'ddfe3653-1569-4f2f-b57f-bf9bae542662',
        username: 'tiepphan',
        firstname: 'tiep',
        lastname: 'phan',
        postCount: 5,
      },
      {
        id: '34784716-019b-4868-86cd-02287e49c2d3',
        username: 'nartc',
        firstname: 'chau',
        lastname: 'tran',
        postCount: 22,
      },
    ];

    // array map
    const usersVm = users.map((user) =>
      // Bọc {...user, fullname: `${user.firstname} ${user.lastname}`,} trong () để biểu thức trả về một đối tượng.
      // Nếu không sẽ lỗi cú pháp, vì JavaScript nghĩ rằng {} là khối lệnh.
      ({...user, fullname: `${user.firstname} ${user.lastname}`,})
    );
    console.log(usersVm);

    const observer = {
      next: (val: any) => console.log(val),
      error: (err: any) => console.log(err),
      complete: () => console.log('complete'),
    };

    /** Pipeable Operators
     * - là một function nó nhận đầu vào là một Observable và returns một Observable khác.
     * Chúng là pure operation: Observable truyền vào sẽ không bị thay đổi gì.
     * - Cú pháp: observableInstance.pipe(operator1(), operator2());
     * - Với cú pháp trên thì observableInstance có pipe bao nhiêu operator đi nữa thì nó vẫn không đổi,
     * và cuối cùng chúng ta sẽ nhận lại một Observable nên để có thể sử dụng thì chúng ta cần gán lại,
     * hoặc thực hiện subscribe ngay sau khi pipe:
     *    const returnObservable = observableInstance.pipe(operator1(), operator2());
     */

    /**
     * Transformation Operators
     */

    //  map
    // merge( // parent observable
    //   of(users[0]).pipe(delay(2000)), // 2s => tiepphan
    //   of(users[1]).pipe(delay(4000)) // 2 tiếp theo (4s) => nartc
    // ).pipe( // nhận giá trị từ parent observable và xử lí
    //   map((user) => {
    //     return {
    //       ...user,
    //       fullname: `${user.firstname} ${user.lastname}`
    //     };
    //   })
    // ).subscribe(observer);


    // pluck => ko khuyến khích sử dụng ở phiên bản mới nữa, thay vào đó sử dụng map
    // const params$ = of({id: 123, foo: {bar: 'duc'}});
    // params$.pipe(pluck('id')).subscribe(observer);
    // params$.pipe(pluck('foo', 'bar')).subscribe(observer);
    //
    // params$.pipe(map((param) => param.id)).subscribe(observer);
    // params$.pipe(map((param) => param.foo.bar)).subscribe(observer);


    // mapTo
    // merge(
    //   // fromEvent(document, 'mouseenter').pipe(mapTo(true)),
    //   // fromEvent(document, 'mouseleave').pipe(mapTo( false))
    //   fromEvent(document, 'mouseenter').pipe(map(() => true)),
    //   fromEvent(document, 'mouseleave').pipe(map( () => false))
    // ).subscribe(observer);


    // reduce: nó sẽ reduce value overtime, nhưng nó sẽ đợi đến khi source complete rồi thì nó mới emit một giá trị cuối cùng và gửi đi complete.
    // const totalCounts = merge(
    //   of(users[0]).pipe(delay(2000)),
    //   of(users[1]).pipe(delay(4000)),
    // ).pipe(
    //   reduce((acc, user) => {
    //     // acc: biến lưu kết quả trước đó qua mỗi lần tính toán
    //     // value: giá trị mà mỗi lần tính toán nhận được từ source observable
    //     return acc + user.postCount;
    //   }, 0) // giá trị mặc định
    // ).subscribe(observer);


    // toArray: cần collect toàn bộ các value emit bởi stream rồi lưu trữ thành một array, sau đó đợi đến khi stream complete thì emit một array và complete.
    // merge(
    //   of(users[0]).pipe(delay(2000)),
    //   of(users[1]).pipe(delay(4000)),
    // ).pipe(
    //   // reduce((acc: any[], user) => [...acc, user], [])
    //   toArray()
    // ).subscribe(observer);


    // buffer: Lưu trữ giá trị được emit ra và đợi đến khi closingNotifier emit thì emit những giá trị đó thành 1 array.
    const source$ = interval(1000);
    const click$ = fromEvent(document, 'click');
    source$.pipe(buffer(click$)).subscribe(observer);


    // bufferTime: Tương tự như buffer, nhưng emit values mỗi khoảng thời gian bufferTimeSpan ms.
    // source$.pipe(bufferTime(2000)).subscribe(observer);


    // scan tích lũy value và emit ra value tích lũy sau mỗi lần nhận được value mới từ Observable nguồn.
    merge(
      of(users[0]).pipe(delay(2000)),
      of(users[1]).pipe(delay(4000))
    ).pipe(
      scan((acc, user) => acc + user.postCount, 0)
    ).subscribe(observer);
  }
}
