// Exercise 01
// Create a Promise that returns "Hello Async" after 2 seconds.

// Promise trả về chuỗi sau 2 giây.
const helloPromise = new Promise<string>((resolve) => {
    setTimeout(() => {
        resolve("Hello Async");
    }, 2000);
});

// Nhận kết quả khi Promise hoàn thành.
helloPromise.then((result) => {
    console.log(result);
});