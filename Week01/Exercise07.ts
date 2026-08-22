// Exercise 07
// Write a class User with private property name and getter/setter.

class User {
    // Thuộc tính private chỉ được truy cập trực tiếp bên trong class.
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    // Getter dùng để lấy giá trị của name.
    public getName(): string {
        return this.name;
    }

    // Setter dùng để thay đổi giá trị của name.
    public setName(name: string): void {
        this.name = name;
    }
}

const user = new User("Than Trong Thang");

console.log("===== USER INFORMATION =====");
console.log(`Original name: ${user.getName()}`);

user.setName("Trong Thang");

console.log(`Updated name: ${user.getName()}`);