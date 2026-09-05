// Exercise 20
// Throw an error if an API call takes more than 2 seconds.

interface User {
    id: number;
    name: string;
}

// Mô phỏng API với thời gian phản hồi tùy chỉnh.
function fetchUser(
    id: number,
    delay: number
): Promise<User> {
    return new Promise<User>((resolve) => {
        setTimeout(() => {
            resolve({
                id: id,
                name: `User ${id}`
            });
        }, delay);
    });
}

// Promise timeout sẽ reject sau 2 giây.
function timeout(ms: number): Promise<never> {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(
                new Error(`Request timed out after ${ms} ms`)
            );
        }, ms);
    });
}

async function fetchUserWithTimeout(
    id: number,
    delay: number
): Promise<User> {

    // Promise nào hoàn thành trước sẽ được lấy kết quả.
    return Promise.race([
        fetchUser(id, delay),
        timeout(2000)
    ]);
}

async function main(): Promise<void> {
    try {
        console.log("Calling API...");

        // API mất 3 giây nên vượt quá timeout 2 giây.
        const user = await fetchUserWithTimeout(1, 3000);

        console.log(user);
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        }
    }
}

main();