// Exercise 01
// Create a class Person with attributes name and age.
// Write a method to display this information.

// Class Person lưu thông tin tên và tuổi của một người.
class Person {
    public name: string;
    public age: number;

    // Constructor dùng để khởi tạo giá trị cho name và age.
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    // Phương thức hiển thị thông tin của Person.
    public displayInfo(): void {
        console.log("===== PERSON INFORMATION =====");
        console.log(`Name: ${this.name}`);
        console.log(`Age: ${this.age}`);
    }
}

// Tạo một đối tượng Person.
const person = new Person("Than Trong Thang", 21);

// Gọi phương thức để hiển thị thông tin.
person.displayInfo();