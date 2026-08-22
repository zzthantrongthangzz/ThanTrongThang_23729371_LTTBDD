// Exercise 23
// Create an interface Payment with method pay(amount).
// Implement CashPayment and CardPayment.

interface Payment {
    pay(amount: number): void;
}

class CashPayment implements Payment {

    public pay(amount: number): void {
        console.log(`Paid ${amount} by cash.`);
    }
}

class CardPayment implements Payment {
    private cardNumber: string;

    constructor(cardNumber: string) {
        this.cardNumber = cardNumber;
    }

    public pay(amount: number): void {
        console.log(
            `Paid ${amount} by card ending in ${this.cardNumber.slice(-4)}.`
        );
    }
}

const cashPayment = new CashPayment();
const cardPayment = new CardPayment("1234567812345678");

console.log("===== PAYMENT =====");
cashPayment.pay(500);
cardPayment.pay(1000);