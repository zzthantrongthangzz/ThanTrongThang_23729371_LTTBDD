// Exercise 27
// Create a class Teacher that extends Person.
// Add subject attribute and introduce method.

class Person {
    public name: string;
    public age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

// Teacher kế thừa Person và bổ sung subject.
class Teacher extends Person {
    public subject: string;

    constructor(name: string, age: number, subject: string) {
        super(name, age);
        this.subject = subject;
    }

    // Hiển thị thông tin giới thiệu của giáo viên.
    public introduce(): void {
        console.log("===== TEACHER INFORMATION =====");
        console.log(`Name: ${this.name}`);
        console.log(`Age: ${this.age}`);
        console.log(`Subject: ${this.subject}`);
    }
}

const teacher = new Teacher(
    "Nguyen Van An",
    35,
    "Object-Oriented Programming"
);

teacher.introduce();
export {};