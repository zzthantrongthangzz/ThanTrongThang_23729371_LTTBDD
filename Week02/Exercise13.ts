// Exercise 13
// Handle errors using try/catch with async/await.

function riskyTask(): Promise<string> {
    return new Promise<string>((_, reject) => {
        setTimeout(() => {
            reject(new Error("Something went wrong"));
        }, 1000);
    });
}

async function runTask(): Promise<void> {
    try {
        // Nếu Promise reject, chương trình chuyển đến catch.
        const result = await riskyTask();
        console.log(result);
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        }
    }
}

runTask();