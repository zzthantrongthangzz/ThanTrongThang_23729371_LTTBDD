// Exercise 06
// Create a class Book with attributes title, author, year.

// Class Book lưu thông tin của một quyển sách.
class Book {
    public title: string;
    public author: string;
    public year: number;

    constructor(title: string, author: string, year: number) {
        this.title = title;
        this.author = author;
        this.year = year;
    }

    // Hiển thị thông tin sách.
    public displayInfo(): void {
        console.log("===== BOOK INFORMATION =====");
        console.log(`Title: ${this.title}`);
        console.log(`Author: ${this.author}`);
        console.log(`Year: ${this.year}`);
    }
}

// Tạo một đối tượng Book.
const book = new Book("Clean Code", "Robert C. Martin", 2008);

book.displayInfo();