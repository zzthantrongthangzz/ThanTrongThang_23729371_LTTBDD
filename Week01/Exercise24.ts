// Exercise 24
// Create an abstract class Appliance with method turnOn().
// Implement Fan and AirConditioner.

abstract class Appliance {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    // Lớp con bắt buộc phải triển khai turnOn().
    public abstract turnOn(): void;
}

class Fan extends Appliance {

    constructor() {
        super("Fan");
    }

    public turnOn(): void {
        console.log(`${this.name} is now running.`);
    }
}

class AirConditioner extends Appliance {

    constructor() {
        super("Air Conditioner");
    }

    public turnOn(): void {
        console.log(`${this.name} is now cooling the room.`);
    }
}

const fan = new Fan();
const airConditioner = new AirConditioner();

console.log("===== APPLIANCES =====");
fan.turnOn();
airConditioner.turnOn();