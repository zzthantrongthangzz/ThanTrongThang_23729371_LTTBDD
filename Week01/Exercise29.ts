// Exercise 29
// Create an interface Movable with method move().
// Implement it in Car and Robot.

// Interface định nghĩa hành vi di chuyển.
interface Movable {
    move(): void;
}

class Car implements Movable {
    public brand: string;

    constructor(brand: string) {
        this.brand = brand;
    }

    public move(): void {
        console.log(`${this.brand} car is moving on the road.`);
    }
}

class Robot implements Movable {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    public move(): void {
        console.log(`${this.name} robot is moving forward.`);
    }
}

const car = new Car("Toyota");
const robot = new Robot("Robo-01");

console.log("===== MOVABLE OBJECTS =====");
car.move();
robot.move();
export {};