"use strict";
class Customer {
    constructor(_firstName, _lastName) {
        this._firstName = _firstName;
        this._lastName = _lastName;
    }
    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        this._firstName = value;
    }
    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        this._lastName = value;
    }
}
// create an instance of Customer
let customer = new Customer("Duc", "Tran");
customer.firstName = "John";
customer.lastName = "Wick";
console.log(customer.firstName);
console.log(customer.lastName);
