// Exercise 24
// Send a POST request to a test API.

interface Post {
    id?: number;
    title: string;
    body: string;
    userId: number;
}

async function postData(): Promise<void> {
    try {
        const newPost: Post = {
            title: "Week 02 Exercise",
            body: "Learning Fetch API with TypeScript",
            userId: 1
        };

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPost)
            }
        );

        if (!response.ok) {
            throw new Error("POST request failed");
        }

        const result = await response.json() as Post;

        console.log("===== CREATED POST =====");
        console.log(result);
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        }
    }
}

postData();