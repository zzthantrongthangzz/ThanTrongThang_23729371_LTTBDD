// Exercise 30
// Create a class School with list of Students and Teachers.
// Add method to display info.

class Person {
    public name: string;
    public age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

class Student extends Person {
    public grade: number;

    constructor(name: string, age: number, grade: number) {
        super(name, age);
        this.grade = grade;
    }

    public displayInfo(): void {
        console.log(
            `Student: ${this.name} | Age: ${this.age} | Grade: ${this.grade}`
        );
    }
}

class Teacher extends Person {
    public subject: string;

    constructor(name: string, age: number, subject: string) {
        super(name, age);
        this.subject = subject;
    }

    public displayInfo(): void {
        console.log(
            `Teacher: ${this.name} | Age: ${this.age} | Subject: ${this.subject}`
        );
    }
}

class School {
    private students: Student[] = [];
    private teachers: Teacher[] = [];

    // Thêm Student vào danh sách của trường.
    public addStudent(student: Student): void {
        this.students.push(student);
    }

    // Thêm Teacher vào danh sách của trường.
    public addTeacher(teacher: Teacher): void {
        this.teachers.push(teacher);
    }

    // Hiển thị toàn bộ thông tin trong trường.
    public displayInfo(): void {
        console.log("===== SCHOOL INFORMATION =====");

        console.log("\n--- STUDENTS ---");
        this.students.forEach((student, index) => {
            console.log(`${index + 1}.`);
            student.displayInfo();
        });

        console.log("\n--- TEACHERS ---");
        this.teachers.forEach((teacher, index) => {
            console.log(`${index + 1}.`);
            teacher.displayInfo();
        });
    }
}

const school = new School();

school.addStudent(
    new Student("Than Trong Thang", 21, 8.5)
);

school.addStudent(
    new Student("Nguyen Van B", 20, 9.0)
);

school.addTeacher(
    new Teacher("Tran Van An", 40, "Programming")
);

school.addTeacher(
    new Teacher("Le Thi Hoa", 35, "Database")
);

school.displayInfo();
export {};