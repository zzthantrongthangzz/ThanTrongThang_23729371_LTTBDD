// Exercise 09
// Define an interface Animal with name and method sound().

// Interface quy định cấu trúc mà một Animal phải có.
interface Animal {
    name: string;
    sound(): void;
}

// Dog implements Animal nên phải có name và sound().
class Dog implements Animal {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    public sound(): void {
        console.log(`${this.name} says: Woof!`);
    }
}

const dog = new Dog("Buddy");

console.log("===== ANIMAL =====");
dog.sound();