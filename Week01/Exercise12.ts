// Exercise 12
// Define interfaces Flyable and Swimmable.
// Implement them in Bird and Fish classes.

interface Flyable {
    fly(): void;
}

interface Swimmable {
    swim(): void;
}

// Bird triển khai khả năng bay.
class Bird implements Flyable {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    public fly(): void {
        console.log(`${this.name} is flying.`);
    }
}

// Fish triển khai khả năng bơi.
class Fish implements Swimmable {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    public swim(): void {
        console.log(`${this.name} is swimming.`);
    }
}

const bird = new Bird("Eagle");
const fish = new Fish("Shark");

console.log("===== FLYABLE =====");
bird.fly();

console.log("\n===== SWIMMABLE =====");
fish.swim();
export {};