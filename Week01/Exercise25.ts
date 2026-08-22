// Exercise 25
// Create a class Shape with a static method describe().

class Shape {

    // Static method thuộc về class thay vì object.
    public static describe(): void {
        console.log(
            "A shape is a geometric figure with a specific form."
        );
    }
}

console.log("===== SHAPE =====");

// Không cần tạo object Shape.
Shape.describe();