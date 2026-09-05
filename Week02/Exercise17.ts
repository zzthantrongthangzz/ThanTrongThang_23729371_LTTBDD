// Exercise 17
// Use for await...of to iterate over an array of Promises.

function createPromise(
    value: string,
    time: number
): Promise<string> {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve(value);
        }, time);
    });
}

const promises: Promise<string>[] = [
    createPromise("Result 1", 1000),
    createPromise("Result 2", 1500),
    createPromise("Result 3", 2000)
];

async function processPromises(): Promise<void> {
    // for await...of lấy kết quả từ từng Promise.
    for await (const result of promises) {
        console.log(result);
    }
}

processPromises();