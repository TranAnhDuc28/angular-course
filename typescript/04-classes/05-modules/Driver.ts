import { Customer } from "./Customer";

// create an instance of Customer
let customer = new Customer("Duc", "Tran");

customer.firstName = "John";
customer.lastName = "Wick";

console.log(customer.firstName);
console.log(customer.lastName);