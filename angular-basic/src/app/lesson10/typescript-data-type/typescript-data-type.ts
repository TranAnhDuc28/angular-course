let someString: string; // string, char
let someNumber: number; // float, double, int
let someBoolean: boolean; // true, false
let something: any; // có thể gán sang cho bất kỳ kiểu dữ liệu nào khác
let someStringArray: string[]; // tương tự cho number[], boolean[], any[]
let someObject: object;
let someNull: null;
let someUndefined: undefined;
let someUnknown: unknown;
let someNever: never; // ví dụ như một hàm throw exception
let someTuple: [string, number];
let someVoidFunction: () => void; // một hàm không trả về giá trị gì sau khi thực thi
let someFunction: () => string; // một hàm trả về giá trị có type "string" sau khi thực thi

// interface or type
interface User {
  firstName: string;
  lastName: string;
  age?: number; // Optional Property, job là một property không-bắt-buộc, nghĩa là có cũng được, không có cũng không sao
}

// type UserType = {
//   firstName: string;
//   lastName: string;
// }

const user: User = {
  firstName: 'Duc',
  lastName: 'Tran',
  age: 28
}

// <T> chính là Generics hay còn gọi là Type Parameter
const numbers = [1, 2, 3, 4];
const strings = ['abc', 'xyz'];
numbers.forEach(num => num);
strings.forEach(str => str);


export abstract class BaseService<T> {
  protected model!: T;

  find(): T[] {
    return [];
  }

  findOne(): T {
    return this.model;
  }
}

interface Dog {
  bark(): void;
}

interface Cat {
  meow(): void;
}

export class DogService extends BaseService<Dog> {
}

export class CatService extends BaseService<Cat> {
}

const dogService = new DogService();
const catService = new CatService();

dogService.findOne().bark();
catService.findOne().meow();
