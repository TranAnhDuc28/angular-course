import {Pipe, PipeTransform} from "@angular/core";
import {pipe} from "rxjs";

@Pipe({
  name: 'adult',
  // pure: false
})
export class AdultPipe implements PipeTransform {

  transform(value: any): any {
    console.log('adult pipe run');
    return value.filter((value: { age: number }) => value.age >= 18);
  }
}
