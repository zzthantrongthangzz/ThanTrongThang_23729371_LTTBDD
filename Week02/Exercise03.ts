// Exercise 03
// Reject a Promise with an error after 1 second.

function createErrorPromise(): Promise<never> {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Something went wrong"));
        }, 1000);
    });
}

// catch() xử lý Promise bị reject.
createErrorPromise()
    .catch((error: Error) => {
        console.log(`Error: ${error.message}`);
    });