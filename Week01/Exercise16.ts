// Exercise 16
// Create a generic class Box that can store any type of value.

// Generic <T> cho phép Box lưu nhiều kiểu dữ liệu khác nhau.
class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    // Trả về giá trị đang được lưu trong Box.
    public getValue(): T {
        return this.value;
    }

    // Thay đổi giá trị trong Box.
    public setValue(value: T): void {
        this.value = value;
    }
}

// Box lưu kiểu string.
const stringBox = new Box<string>("Hello TypeScript");

// Box lưu kiểu number.
const numberBox = new Box<number>(100);

console.log("===== GENERIC BOX =====");
console.log(`String Box: ${stringBox.getValue()}`);
console.log(`Number Box: ${numberBox.getValue()}`);

numberBox.setValue(200);
console.log(`Updated Number Box: ${numberBox.getValue()}`);
export {};