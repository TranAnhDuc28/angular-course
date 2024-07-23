type StringOrNumber = string | number;

// Support Type (type dùng để hỗ trợ cho True Type).
type ObjectDictionary<T> = { [key: string]: T }; // {foo: T, bar: T}
type ArrayDictionary<T> = { [key: string]: T[] }; // {foo: T[], bar: T[]}

//  True Type (type được export ra cho bên ngoài sử dụng),
export type Dictionary<T>
  = T extends []
  ? ArrayDictionary<T[number]>
  : ObjectDictionary<T>;

type StringDictionary = Dictionary<string>; // {[key: string]: string} -> {foo: '123', bar: '1234'}
type NumberArrayDictionary = Dictionary<number[]>; // {[key: string]: number[]} -> {foo: '123', bar: '1234'}
type UserEntity = Dictionary<StringOrNumber>;

const entity: UserEntity = {
  foo: 'foo',
  bar: '123'
}


/**
 * built-in type
 */

// Exclude/Extract
type Exclude<T, U> = T extends U ? never : T; // Exclude: Loại bỏ những types ở T nếu như những types này gán được cho U
type Extract<T, U> = T extends U ? T : never; // Extract: Loại bỏ những types ở T nếu như những types này KHÔNG gán được cho U

interface User {
  firstName: string;
  lastName: string;
  password: string;
}

// example Exclude
type SomeDiff = Exclude<'a' | 'b' | 'c', 'c' | 'd'>; // 'a' | 'b'. 'c' đã bị removed.
type SomeUser = Exclude<keyof User, 'password'> // "firstName" | "lastName". 'password' đã bị removed.
// example Extract
type SomeFilter = Extract<'a' | 'b' | 'c', 'c' | 'd'>; // 'c'. 'a' và 'b' đã bị removed.


// hoặc có thể dùng Exclude để tạo type alias NonNullable
type NonNullable<T> = Exclude<T, null | undefined>; // loại bỏ null và undefined từ T
type StringOrNumberOrUndifined = StringOrNumber | undefined;
type test = NonNullable<StringOrNumberOrUndifined>; // test -> string | number



// làm tất cả các props trong type thành readonly. Eg: Rất có lợi khi dùng cho Redux State.
type Readonly<T> = { readonly [P in keyof T]: T[P] };
const readonlyUser: Readonly<User> = {
  firstName: 'Duc',
  lastName: 'Tran',
  password: '123'
}
// readonlyUser.firstName = 'john'; // giá trị chỉ có thể đọc mà không thể gán giá trị -> error



// làm tất cả các props trong type thành optional. Eg: Rất có lợi cho việc type 1 tham số khi cần truyền vào 1 type nào đó mà ko bắt buộc.
type Partial<T> = { [P in keyof T]?: T[P] };
const partialUser: Partial<User> = {
}


// cái này tương tự như Partial, Partial sẽ trả về T[P] | undefined. Còn Nullable sẽ trả về T[P] | null
type Nullable<T> = { [P in keyof T]: T[P] | null };
const nullableUser: Nullable<User> = {
  firstName: null,
  lastName: null,
  password: null,
}


// Required<T> làm cho các props trong T phải có
const requiredUser: Required<User> = {
  firstName: 'Duc',
  lastName: 'Tran',
  password: '123'
}


type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Record<K extends keyof any, T> = { [P in K]: T };

// Pick: Pick từ trong T những type có key là K
type Person = {
  firstName: string;
  lastName: string;
  password: string;
};
type PersonWithNames = Pick<Person, 'firstName' | 'lastName'>; // {firstName: string, lastName: string}

// Record: Gán type T cho lần lượt từng key P trong K
type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>; // { prop1: string, prop2: string, prop3: string }

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
// ReturnType: trả về type của giá trị mà function T trả về.
type Result = ReturnType<() => string>; // string
type test2 = ReturnType<() => StringOrNumber>;


// Omit: loại bỏ type có key là K trong T (ngược lại với Pick)
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PersonWithoutPassword = Omit<Person, 'password'>; // {firstName: string, lastName: string}
