// Exercise 06
// Use Promise.all() to run 3 Promises in parallel.

function simulateTask(
    name: string,
    time: number
): Promise<string> {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve(`${name} completed`);
        }, time);
    });
}

const task1 = simulateTask("Task 1", 1000);
const task2 = simulateTask("Task 2", 2000);
const task3 = simulateTask("Task 3", 1500);

// Promise.all() chờ tất cả Promise hoàn thành.
Promise.all([task1, task2, task3])
    .then((results) => {
        console.log("All tasks completed:");

        results.forEach((result) => {
            console.log(result);
        });
    });