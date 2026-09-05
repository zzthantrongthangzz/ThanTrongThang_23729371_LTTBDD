// Exercise 25
// Simulate downloading a file in 3 seconds.

function downloadFile(fileName: string): Promise<string> {
    return new Promise<string>((resolve) => {
        console.log(`Downloading ${fileName}...`);

        setTimeout(() => {
            resolve(`${fileName} downloaded successfully`);
        }, 3000);
    });
}

async function main(): Promise<void> {
    const result = await downloadFile("document.pdf");

    console.log(result);
}

main();