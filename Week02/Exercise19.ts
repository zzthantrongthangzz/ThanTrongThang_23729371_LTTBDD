// Exercise 19
// Create fetchUsers(ids) that calls fetchUser for each ID.

interface User {
    id: number;
    name: string;
}

async function fetchUser(id: number): Promise<User> {
    await new Promise<void>((resolve) => {
        setTimeout(resolve, 1000);
    });

    return {
        id: id,
        name: `User ${id}`
    };
}

async function fetchUsers(ids: number[]): Promise<User[]> {
    // Tạo một Promise fetchUser cho mỗi ID.
    const userPromises = ids.map((id) => fetchUser(id));

    // Chờ tất cả user được tải xong.
    return Promise.all(userPromises);
}

async function main(): Promise<void> {
    const ids = [1, 2, 3, 4, 5];

    console.log("Fetching users...");

    const users = await fetchUsers(ids);

    console.log(users);
}

main();