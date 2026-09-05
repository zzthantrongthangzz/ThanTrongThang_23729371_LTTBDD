// Exercise 11
// Convert Exercise 1 into async/await.

// Promise trả về "Hello Async" sau 2 giây.
function getHelloAsync(): Promise<string> {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve("Hello Async");
        }, 2000);
    });
}

// Dùng await để chờ Promise hoàn thành.
async function main(): Promise<void> {
    const result = await getHelloAsync();
    console.log(result);
}

main();