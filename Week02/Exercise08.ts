// Exercise 08
// Promise chain: square 2, double it, then add 5.

Promise.resolve(2)

    // Bình phương 2: 2² = 4.
    .then((number) => {
        const result = number * number;
        console.log(`Square: ${result}`);
        return result;
    })

    // Nhân đôi: 4 × 2 = 8.
    .then((number) => {
        const result = number * 2;
        console.log(`Double: ${result}`);
        return result;
    })

    // Cộng thêm 5: 8 + 5 = 13.
    .then((number) => {
        const result = number + 5;
        console.log(`Add 5: ${result}`);
        return result;
    })

    .then((finalResult) => {
        console.log(`Final result: ${finalResult}`);
    });