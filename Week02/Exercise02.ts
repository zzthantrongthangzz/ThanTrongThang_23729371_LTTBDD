// Exercise 02
// Return a Promise resolving with number 10 after 1 second.

function getNumber(): Promise<number> {
    return new Promise<number>((resolve) => {
        setTimeout(() => {
            resolve(10);
        }, 1000);
    });
}

getNumber().then((result) => {
    console.log(`Result: ${result}`);
});