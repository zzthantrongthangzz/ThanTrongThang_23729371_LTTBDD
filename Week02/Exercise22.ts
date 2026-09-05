// Exercise 22
// Call the API multiple times and log the results.

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

async function fetchTodo(id: number): Promise<Todo> {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
    );

    if (!response.ok) {
        throw new Error(`Cannot fetch todo ${id}`);
    }

    return await response.json() as Todo;
}

async function main(): Promise<void> {
    try {
        // Gọi nhiều API song song.
        const todos = await Promise.all([
            fetchTodo(1),
            fetchTodo(2),
            fetchTodo(3)
        ]);

        todos.forEach((todo) => {
            console.log(
                `ID: ${todo.id} | Title: ${todo.title}`
            );
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        }
    }
}

main();