// Exercise 04
// Handle a random-number Promise using then() and catch().

const randomPromise = new Promise<number>((resolve, reject) => {
    const randomNumber = Math.random();

    // Nếu số >= 0.5 thì thành công, ngược lại thất bại.
    if (randomNumber >= 0.5) {
        resolve(randomNumber);
    } else {
        reject(
            new Error(
                `Random number ${randomNumber.toFixed(2)} is less than 0.5`
            )
        );
    }
});

randomPromise
    .then((number) => {
        console.log(`Success: ${number.toFixed(2)}`);
    })
    .catch((error: Error) => {
        console.log(`Error: ${error.message}`);
    });