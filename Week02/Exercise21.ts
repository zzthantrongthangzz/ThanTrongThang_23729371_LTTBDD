// Exercise 21
// Use fetch to get data from a public API.

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

async function getTodo(): Promise<void> {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos/1"
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const todo = await response.json() as Todo;

        console.log("===== TODO =====");
        console.log(todo);
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        }
    }
}

getTodo();