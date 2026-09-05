// Exercise 16
// Call multiple async functions in parallel using Promise.all().

function task(name: string, time: number): Promise<string> {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve(`${name} completed`);
        }, time);
    });
}

async function runInParallel(): Promise<void> {
    // Các Promise được tạo và chạy song song.
    const results = await Promise.all([
        task("Task 1", 1000),
        task("Task 2", 2000),
        task("Task 3", 1500)
    ]);

    results.forEach((result) => {
        console.log(result);
    });
}

runInParallel();