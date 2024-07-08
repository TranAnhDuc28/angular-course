"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Customer_1 = require("./Customer");
// create an instance of Customer
let customer = new Customer_1.Customer("Duc", "Tran");
customer.firstName = "John";
customer.lastName = "Wick";
console.log(customer.firstName);
console.log(customer.lastName);
