// Exercise 14
// Write an async function that takes a number,
// waits 1 second, and returns the number × 3.

async function multiplyByThree(number: number): Promise<number> {
    // Chờ 1 giây.
    await new Promise<void>((resolve) => {
        setTimeout(resolve, 1000);
    });

    return number * 3;
}

async function main(): Promise<void> {
    const number = 5;

    const result = await multiplyByThree(number);

    console.log(`Number: ${number}`);
    console.log(`Result: ${result}`);
}

main();