// Exercise 18
// Create a static class MathUtil with methods
// add(), subtract(), multiply(), divide().

// MathUtil chỉ chứa các phương thức static.
// Không cần tạo object để sử dụng.
class MathUtil {

    public static add(a: number, b: number): number {
        return a + b;
    }

    public static subtract(a: number, b: number): number {
        return a - b;
    }

    public static multiply(a: number, b: number): number {
        return a * b;
    }

    public static divide(a: number, b: number): number {
        if (b === 0) {
            throw new Error("Cannot divide by zero.");
        }

        return a / b;
    }
}

console.log("===== MATH UTIL =====");
console.log(`10 + 5 = ${MathUtil.add(10, 5)}`);
console.log(`10 - 5 = ${MathUtil.subtract(10, 5)}`);
console.log(`10 * 5 = ${MathUtil.multiply(10, 5)}`);
console.log(`10 / 5 = ${MathUtil.divide(10, 5)}`);