/** UNION TYPE
 * - Union Type là những types mang tính chất: EITHER OR (tạm dịch là Hoặc cái này Hoặc cái kia).
 * Để viết Union Type, ta dùng Pipe Symbol (|).
 *
 * - unknown là type bất cứ giá trị nào cũng có thể gán được cho unknown
 */
function listen(port: string | number) {
  if (typeof port === 'string') {
    port = parseInt(port, 10);
  }
}

listen('8080');
listen(8080);
// listen(true); // TypeError: Argument of type true is not assignable to parameter type string | number
// listen(); // TypeError: Invalid number of arguments, expected 1




// typeof
typeof 'string'; // string
typeof 123; // number
typeof true; // boolean
typeof {}; // object
typeof []; // object
typeof (() => {
}); // function
typeof null; // object
typeof undefined; // undefined
typeof new Date(); // object
typeof String; // function
typeof Boolean; // function
typeof NaN; // number
typeof typeof 123; // string




/**
 * tạo Union Type cho giá trị trả về của hàm.
 */
function getSomething(): string | number {
  return 'string'; // works
  // return 30; // works
  // return true; // TypeError: Returned expression type boolean is not assignable to type string | number
}



/**
 * Để tái sử dụng (reuse) 1 Union Type bất kỳ, có thể tạo Type Alias cho Union Type đó
 */
type StringOrNumber = string | number;

function listen1(port: StringOrNumber) {
}

function getSomething1(): StringOrNumber {
  return 30;
}


/** Intersection Type
 * - Ngược với Union Type, Intersection Type là type mà kết hợp nhiều type lại với nhau.
 * Nói cách khác, Intersection Type là type có tính chất: AND.
 *
 * - Hàm merge({ foo: 'bar' }, { bar: 'foo' }) này sẽ có giá trị trả về là { foo: string } & { bar: string }.
 */
function merge<T1, T2>(o1: T1, o2: T2): T1 & T2 {
  return { ...o1, ...o2 };
}
const result = merge({ foo: 'bar' }, { bar: 'foo' });


/**
 * Conditional Type có mặt trong TS từ version 2.8, giúp cho chúng ta có thể tạo ra những type theo điều kiện.
 *      T extends U ? X : Y;
 * => Đoạn code trên có thể hiểu là khi type T có thể gán được cho type U thì sẽ trả về type X, còn không thì trả về type Y
 */
