// Exercise 28
// Create a class Animal with protected method makeSound().
// Extend Dog and Cat to override it.

class Animal {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    // protected: chỉ class hiện tại và class con có thể sử dụng.
    protected makeSound(): void {
        console.log("Animal makes a sound.");
    }

    // Phương thức public để thực hiện hành vi phát âm thanh.
    public speak(): void {
        this.makeSound();
    }
}

class Dog extends Animal {

    // Override phương thức protected từ lớp cha.
    protected override makeSound(): void {
        console.log(`${this.name} says: Woof!`);
    }
}

class Cat extends Animal {

    // Override phương thức protected từ lớp cha.
    protected override makeSound(): void {
        console.log(`${this.name} says: Meow!`);
    }
}

const dog = new Dog("Buddy");
const cat = new Cat("Kitty");

console.log("===== ANIMAL SOUNDS =====");
dog.speak();
cat.speak();
export {};