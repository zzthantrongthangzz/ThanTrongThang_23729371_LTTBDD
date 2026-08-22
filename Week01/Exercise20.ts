// Exercise 20
// Write a Vehicle interface and implement it
// in Car and Bike classes.

interface Vehicle {
    brand: string;
    move(): void;
}

class Car implements Vehicle {
    public brand: string;

    constructor(brand: string) {
        this.brand = brand;
    }

    public move(): void {
        console.log(`${this.brand} car is driving.`);
    }
}

class Bike implements Vehicle {
    public brand: string;

    constructor(brand: string) {
        this.brand = brand;
    }

    public move(): void {
        console.log(`${this.brand} bike is moving.`);
    }
}

const car = new Car("Toyota");
const bike = new Bike("Giant");

console.log("===== VEHICLES =====");
car.move();
bike.move();
export {};