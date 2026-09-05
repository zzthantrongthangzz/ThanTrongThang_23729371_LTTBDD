// Exercise 07
// Promise.race() returns the result of the first completed Promise.

function createTask(
    name: string,
    time: number
): Promise<string> {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve(`${name} finished first`);
        }, time);
    });
}

const task1 = createTask("Task 1", 2000);
const task2 = createTask("Task 2", 1000);
const task3 = createTask("Task 3", 3000);

// Task có thời gian hoàn thành nhanh nhất sẽ thắng.
Promise.race([task1, task2, task3])
    .then((result) => {
        console.log(result);
    });