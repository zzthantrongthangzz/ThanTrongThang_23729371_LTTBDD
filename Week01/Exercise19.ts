// Exercise 19
// Demonstrate method overriding using polymorphism
// with Animal and subclasses.

class Animal {
    // Phương thức chung của Animal.
    public makeSound(): void {
        console.log("Animal makes a sound.");
    }
}

class Dog extends Animal {
    // Override phương thức của lớp cha.
    public override makeSound(): void {
        console.log("Dog says: Woof!");
    }
}

class Cat extends Animal {
    // Override phương thức của lớp cha.
    public override makeSound(): void {
        console.log("Cat says: Meow!");
    }
}

// Mảng Animal có thể chứa các object thuộc lớp con.
const animals: Animal[] = [
    new Animal(),
    new Dog(),
    new Cat()
];

console.log("===== POLYMORPHISM =====");

animals.forEach(animal => {
    animal.makeSound();
});
export {};