// Exercise 02
// Write a class Student extending Person with an additional attribute grade.
// Add a method to display all info.

// Lớp Person chứa thông tin cơ bản của một người.
class Person {
    public name: string;
    public age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

// Student kế thừa Person và bổ sung thuộc tính grade.
class Student extends Person {
    public grade: number;

    constructor(name: string, age: number, grade: number) {
        // Gọi constructor của lớp cha Person.
        super(name, age);
        this.grade = grade;
    }

    // Hiển thị toàn bộ thông tin của Student.
    public displayInfo(): void {
        console.log("===== STUDENT INFORMATION =====");
        console.log(`Name: ${this.name}`);
        console.log(`Age: ${this.age}`);
        console.log(`Grade: ${this.grade}`);
    }
}

// Tạo đối tượng Student.
const student = new Student("Than Trong Thang", 21, 8.5);

student.displayInfo();