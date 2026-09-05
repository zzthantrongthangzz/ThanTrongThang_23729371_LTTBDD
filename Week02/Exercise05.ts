// Exercise 05
// simulateTask(time) resolves "Task done" after time milliseconds.

function simulateTask(time: number): Promise<string> {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    });
}

console.log("Task started...");

simulateTask(2000).then((result) => {
    console.log(result);
});