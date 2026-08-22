// Exercise 13
// Create an abstract class Shape with method area().
// Implement Square and Circle.

// Abstract class không dùng để tạo đối tượng trực tiếp.
abstract class Shape {
    // Các class con bắt buộc phải triển khai phương thức area().
    public abstract area(): number;
}

class Square extends Shape {
    public side: number;

    constructor(side: number) {
        super();
        this.side = side;
    }

    public area(): number {
        return this.side * this.side;
    }
}

class Circle extends Shape {
    public radius: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    public area(): number {
        return Math.PI * this.radius * this.radius;
    }
}

const square = new Square(5);
const circle = new Circle(3);

console.log("===== SHAPE AREA =====");
console.log(`Square area: ${square.area()}`);
console.log(`Circle area: ${circle.area().toFixed(2)}`);
export {};