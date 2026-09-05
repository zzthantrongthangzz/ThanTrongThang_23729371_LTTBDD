// Exercise 09
// Read an array after 1 second and filter even numbers.

function getNumbers(): Promise<number[]> {
    return new Promise<number[]>((resolve) => {
        setTimeout(() => {
            resolve([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        }, 1000);
    });
}

getNumbers()
    .then((numbers) => {
        console.log(`Original array: ${numbers}`);

        // Chỉ giữ những số chia hết cho 2.
        return numbers.filter((number) => number % 2 === 0);
    })
    .then((evenNumbers) => {
        console.log(`Even numbers: ${evenNumbers}`);
    });