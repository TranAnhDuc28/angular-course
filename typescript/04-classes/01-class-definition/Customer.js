var Customer = /** @class */ (function () {
    function Customer(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return Customer;
}());
// create an instance of Customer
var customer = new Customer("Duc", "Tran");
console.log(customer.firstName);
console.log(customer.lastName);
