// Exercise 27
// Retry the API request when it fails.

async function fetchWithRetry(
    url: string,
    retries: number
): Promise<unknown> {

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`Attempt ${attempt}...`);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(
                    `HTTP status ${response.status}`
                );
            }

            return await response.json();
        } catch (error) {
            if (attempt === retries) {
                throw error;
            }

            console.log("Request failed. Retrying...");
        }
    }

    throw new Error("Request failed");
}

async function main(): Promise<void> {
    try {
        // URL sai để minh họa retry.
        const data = await fetchWithRetry(
            "https://jsonplaceholder.typicode.com/invalid-url",
            3
        );

        console.log(data);
    } catch (error) {
        if (error instanceof Error) {
            console.log(
                `Final error: ${error.message}`
            );
        }
    }
}

main();