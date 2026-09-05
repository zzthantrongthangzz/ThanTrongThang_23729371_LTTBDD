// Exercise 28
// Process 5 async tasks at once using Promise.all().

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

async function batchProcess(): Promise<void> {
    console.log("Starting batch process...");

    // 5 task chạy đồng thời.
    const results = await Promise.all([
        processTask(1, 1000),
        processTask(2, 1500),
        processTask(3, 2000),
        processTask(4, 1200),
        processTask(5, 1800)
    ]);

    results.forEach((result) => {
        console.log(result);
    });

    console.log("Batch process completed.");
}

batchProcess();