// Exercise 05
// Create a class BankAccount with balance.
// Add methods deposit() and withdraw().

// Class BankAccount quản lý số dư của một tài khoản ngân hàng.
class BankAccount {
    public balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    // Nạp tiền vào tài khoản.
    public deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited: ${amount}`);
        } else {
            console.log("Deposit amount must be greater than 0.");
        }
    }

    // Rút tiền nếu số dư tài khoản đủ.
    public withdraw(amount: number): void {
        if (amount <= 0) {
            console.log("Withdraw amount must be greater than 0.");
        } else if (amount > this.balance) {
            console.log("Insufficient balance.");
        } else {
            this.balance -= amount;
            console.log(`Withdrawn: ${amount}`);
        }
    }

    // Hiển thị số dư hiện tại.
    public displayBalance(): void {
        console.log(`Current balance: ${this.balance}`);
    }
}

// Tạo tài khoản với số dư ban đầu là 1000.
const account = new BankAccount(1000);

console.log("===== BANK ACCOUNT =====");

account.displayBalance();

account.deposit(500);
account.displayBalance();

account.withdraw(300);
account.displayBalance();