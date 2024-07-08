class Customer {

    constructor(
        private _firstName: string,
        private _lastName: string
    ) {}

    public get firstName(): string {
        return this._firstName;
    }

    public set firstName(value: string) {
        this._firstName = value;
    }

    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }
}

// create an instance of Customer

let customer = new Customer("Duc", "Tran");

customer.firstName = "John";
customer.lastName = "Wick";

console.log(customer.firstName);
console.log(customer.lastName);
