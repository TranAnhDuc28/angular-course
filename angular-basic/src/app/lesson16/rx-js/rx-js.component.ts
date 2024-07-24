import {Component, OnInit} from '@angular/core';
import {fromEvent, map, Observable, Observer, throttleTime} from "rxjs";

@Component({
  selector: 'app-rx-js',
  templateUrl: './rx-js.component.html',
  styleUrls: ['./rx-js.component.css']
})
export class RxJSComponent implements OnInit {

  ngOnInit(): void {
    // const rate: number = 1000;
// let lastMove: number = Date.now() - rate;
// document.addEventListener('mouseover', ev => {
//   if(Date.now() - lastMove > rate) {
//     console.log(ev);
//     lastMove = Date.now();
//   }
// })

// fromEvent<MouseEvent>(document, 'mouseover').pipe(
//   throttleTime(1000),
//   map((ev: MouseEvent) => ev.clientX + ' ' + ev.clientY)
// ).subscribe(console.log);


    const observable = new Observable(function subscribe(observer: Observer<any>) {
      const id = setInterval(() => {
        observer.next("Hello RxJS!");
        // observer.complete();
      }, 1000);
      return function unsubscribe() {
        clearInterval(id);
      }
    });

    const subscription = observable.subscribe({
      next: (value) => console.log(value),
      error: (error) => console.log(error),
      complete: () => console.log("Complete")
    });

    subscription.add(observable.subscribe(console.log))

    setTimeout(() => {
      subscription.unsubscribe()
    }, 10000);

  }

}
