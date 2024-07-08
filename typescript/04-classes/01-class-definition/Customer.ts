class Customer {

    firstName: string;
    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

// create an instance of Customer

let customer = new Customer("Duc", "Tran");

console.log(customer.firstName);
console.log(customer.lastName);
