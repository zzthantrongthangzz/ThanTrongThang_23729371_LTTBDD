// Exercise 23
// Fetch a list of todos and filter completed todos.

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

async function getCompletedTodos(): Promise<void> {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch todos");
        }

        const todos = await response.json() as Todo[];

        // Chỉ lấy các todo đã hoàn thành.
        const completedTodos = todos.filter(
            (todo) => todo.completed
        );

        console.log(
            `Total completed todos: ${completedTodos.length}`
        );

        // Hiển thị 5 phần tử đầu tiên.
        completedTodos.slice(0, 5).forEach((todo) => {
            console.log(
                `${todo.id}. ${todo.title}`
            );
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        }
    }
}

getCompletedTodos();