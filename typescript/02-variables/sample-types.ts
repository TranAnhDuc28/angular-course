let found: boolean = false;
let grade: number = 88;
let firstName: string = "Duc";
let lastName: string = "Tran";

/* => compile is error
found = 0;
grade = "A";
firstName = false;
*/

console.log(found);
console.log("The grade is " + grade);
console.log("Hi " + firstName + " " + lastName);

// use template Strings
console.log(`Hi ${firstName} ${lastName}`);
