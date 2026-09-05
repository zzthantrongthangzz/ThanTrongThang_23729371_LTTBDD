// Exercise 18
// Simulate an API call that returns a user after 1 second.

interface User {
    id: number;
    name: string;
}

async function fetchUser(id: number): Promise<User> {
    // Mô phỏng thời gian gọi API là 1 giây.
    await new Promise<void>((resolve) => {
        setTimeout(resolve, 1000);
    });

    return {
        id: id,
        name: `User ${id}`
    };
}

async function main(): Promise<void> {
    console.log("Fetching user...");

    const user = await fetchUser(1);

    console.log(user);
}

main();