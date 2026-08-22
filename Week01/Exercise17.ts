// Exercise 17
// Write a singleton Logger class that logs messages to console.

class Logger {
    // Lưu duy nhất một instance của Logger.
    private static instance: Logger;

    // Constructor private ngăn tạo Logger bằng new từ bên ngoài.
    private constructor() {}

    // Trả về instance duy nhất của Logger.
    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }

        return Logger.instance;
    }

    // Hiển thị message ra console.
    public log(message: string): void {
        console.log(`[LOG]: ${message}`);
    }
}

const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();

console.log("===== SINGLETON LOGGER =====");

logger1.log("Application started.");
logger2.log("User logged in.");

// Hai biến cùng tham chiếu đến một instance.
console.log(`Same instance: ${logger1 === logger2}`);