// Exercise 03
// Create a class Car with properties brand, model, year.
// Write a method to show car info.

// Class Car lưu thông tin của một chiếc xe.
class Car {
    public brand: string;
    public model: string;
    public year: number;

    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    // Hiển thị thông tin xe.
    public showInfo(): void {
        console.log("===== CAR INFORMATION =====");
        console.log(`Brand: ${this.brand}`);
        console.log(`Model: ${this.model}`);
        console.log(`Year: ${this.year}`);
    }
}

// Tạo đối tượng Car.
const car = new Car("Toyota", "Camry", 2025);

car.showInfo();