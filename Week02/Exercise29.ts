// Exercise 29
// Process async tasks sequentially in a queue.

function processTask(
    id: number,
    time: number
): Promise<string> {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve(`Task ${id} completed`);
        }, time);
    });
}

async function queueProcess(): Promise<void> {
    const tasks = [
        { id: 1, time: 1000 },
        { id: 2, time: 1000 },
        { id: 3, time: 1000 },
        { id: 4, time: 1000 },
        { id: 5, time: 1000 }
    ];

    console.log("Starting queue...");

    // Mỗi task chờ task trước hoàn thành.
    for (const task of tasks) {
        const result = await processTask(
            task.id,
            task.time
        );

        console.log(result);
    }

    console.log("Queue completed.");
}

queueProcess();