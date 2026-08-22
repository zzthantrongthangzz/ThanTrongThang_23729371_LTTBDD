// Exercise 10
// Create a class Account with public, private and readonly fields.

class Account {
    // Có thể truy cập từ bên ngoài class.
    public username: string;

    // Chỉ được truy cập bên trong class.
    private password: string;

    // Chỉ được gán khi khởi tạo và không thể thay đổi sau đó.
    public readonly accountId: number;

    constructor(username: string, password: string, accountId: number) {
        this.username = username;
        this.password = password;
        this.accountId = accountId;
    }

    // Kiểm tra mật khẩu mà không cho truy cập trực tiếp password.
    public checkPassword(password: string): boolean {
        return this.password === password;
    }

    public displayInfo(): void {
        console.log(`Account ID: ${this.accountId}`);
        console.log(`Username: ${this.username}`);
    }
}

const account = new Account("thang23729371", "123456", 1001);

console.log("===== ACCOUNT INFORMATION =====");
account.displayInfo();

console.log(`Correct password: ${account.checkPassword("123456")}`);
console.log(`Wrong password: ${account.checkPassword("abc")}`);
export {};