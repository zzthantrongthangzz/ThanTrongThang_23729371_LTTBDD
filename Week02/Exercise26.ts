// Exercise 26
// Use async/await with setTimeout to simulate a 5-second wait.

function wait(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function main(): Promise<void> {
    console.log("Waiting for 5 seconds...");

    await wait(5000);

    console.log("5 seconds finished.");
}

main();