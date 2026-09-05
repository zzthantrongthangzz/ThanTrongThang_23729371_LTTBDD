// Exercise 10
// Use finally() when a Promise finishes.

const promise = new Promise<string>((resolve) => {
    setTimeout(() => {
        resolve("Promise completed successfully");
    }, 1000);
});

promise
    .then((result) => {
        console.log(result);
    })
    .catch((error: Error) => {
        console.log(`Error: ${error.message}`);
    })
    .finally(() => {
        // finally() luôn chạy dù Promise success hay failure.
        console.log("Done");
    });