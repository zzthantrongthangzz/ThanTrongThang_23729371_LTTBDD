// Exercise 30
// Handle multiple API calls using Promise.allSettled().

async function fetchData(url: string): Promise<unknown> {
    const response = await fetch(url);

    // fetch không tự reject khi HTTP 404,
    // nên cần kiểm tra response.ok.
    if (!response.ok) {
        throw new Error(
            `HTTP error ${response.status}`
        );
    }

    return await response.json();
}

async function main(): Promise<void> {

    const requests = [
        fetchData(
            "https://jsonplaceholder.typicode.com/todos/1"
        ),

        fetchData(
            "https://jsonplaceholder.typicode.com/users/1"
        ),

        // URL này cố ý sai để tạo một request thất bại.
        fetchData(
            "https://jsonplaceholder.typicode.com/invalid-url"
        )
    ];

    // Chờ tất cả Promise hoàn thành dù success hay failure.
    const results = await Promise.allSettled(requests);

    results.forEach((result, index) => {
        console.log(`Request ${index + 1}:`);

        if (result.status === "fulfilled") {
            console.log("Status: SUCCESS");
            console.log(result.value);
        } else {
            console.log("Status: FAILED");

            if (result.reason instanceof Error) {
                console.log(
                    `Error: ${result.reason.message}`
                );
            }
        }

        console.log("---");
    });
}

main();