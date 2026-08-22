// Exercise 11
// Create a base class Animal.
// Extend Dog and Cat classes with methods bark() and meow().

// Lớp cha chứa thông tin chung của động vật.
class Animal {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    public displayName(): void {
        console.log(`Name: ${this.name}`);
    }
}

// Dog kế thừa Animal.
class Dog extends Animal {
    public bark(): void {
        console.log(`${this.name} says: Woof!`);
    }
}

// Cat kế thừa Animal.
class Cat extends Animal {
    public meow(): void {
        console.log(`${this.name} says: Meow!`);
    }
}

const dog = new Dog("Buddy");
const cat = new Cat("Kitty");

console.log("===== DOG =====");
dog.displayName();
dog.bark();

console.log("\n===== CAT =====");
cat.displayName();
cat.meow();
export {};