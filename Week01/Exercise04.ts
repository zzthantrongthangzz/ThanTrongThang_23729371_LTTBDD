// Exercise 04
// Create a class Rectangle with width and height.
// Write a method to calculate area and perimeter.

// Class Rectangle biểu diễn một hình chữ nhật.
class Rectangle {
    public width: number;
    public height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    // Tính diện tích hình chữ nhật.
    public calculateArea(): number {
        return this.width * this.height;
    }

    // Tính chu vi hình chữ nhật.
    public calculatePerimeter(): number {
        return 2 * (this.width + this.height);
    }
}

// Tạo hình chữ nhật có chiều rộng 10 và chiều cao 5.
const rectangle = new Rectangle(10, 5);

console.log("===== RECTANGLE INFORMATION =====");
console.log(`Width: ${rectangle.width}`);
console.log(`Height: ${rectangle.height}`);
console.log(`Area: ${rectangle.calculateArea()}`);
console.log(`Perimeter: ${rectangle.calculatePerimeter()}`);