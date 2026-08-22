// Exercise 14
// Create a base class Employee.
// Extend Manager and Developer with specific methods.

class Employee {
    public name: string;
    public salary: number;

    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
    }

    public displayInfo(): void {
        console.log(`Name: ${this.name}`);
        console.log(`Salary: ${this.salary}`);
    }
}

// Manager có chức năng quản lý nhóm.
class Manager extends Employee {
    public manageTeam(): void {
        console.log(`${this.name} is managing the team.`);
    }
}

// Developer có chức năng viết code.
class Developer extends Employee {
    public writeCode(): void {
        console.log(`${this.name} is writing code.`);
    }
}

const manager = new Manager("John", 3000);
const developer = new Developer("David", 2000);

console.log("===== MANAGER =====");
manager.displayInfo();
manager.manageTeam();

console.log("\n===== DEVELOPER =====");
developer.displayInfo();
developer.writeCode();
export {};