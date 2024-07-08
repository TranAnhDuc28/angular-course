let sportsOne: string[] = ["Golf", "Cricket", "Tennis", "Swimming"];

// Use the simplied for loop
for (let item of sportsOne) {
    if (item === "Cricket") {
        console.log(item + " << My favorite");
    } else {
        console.log(item);
    }
}
