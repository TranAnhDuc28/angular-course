import {Component, OnInit} from '@angular/core';
import {interval} from "rxjs";

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: []
})
export class PipeComponent {
  currentDate: Date = new Date();
  user = {
    name: 'John Doe',
    age: 30,
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY'
    }
  }

  users = [
    {
      name: "Tiep Phan",
      age: 30
    },
    {
      name: "Trung Vo",
      age: 28
    },
    {
      name: "Chau Tran",
      age: 29
    },
    {
      name: "Tuan Anh",
      age: 16
    }
  ];

  interval$ = interval(1000);

  address = {
    address1: '123 Main St',
    address2: '456 Main St',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90001',
    country: 'US'
  }

  formatAddress(address: any) {
    // console.log(address);
    return address.address1 + ' ' +
      address.address2 + ', ' +
      address.city + ', ' +
      address.state + ' ' +
      address.zip + ', ' +
      address.country;
  }

  addUser(): void {
    // this.users.push({name: 'new user', age: 18});
    this.users = [...this.users, {name: 'new user', age: 18}];
  }
}
