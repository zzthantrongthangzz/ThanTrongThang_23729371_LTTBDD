// Exercise 15
// Create a Library class that can store Book and User objects.
// Add method to add books.

class Book {
    public title: string;
    public author: string;

    constructor(title: string, author: string) {
        this.title = title;
        this.author = author;
    }
}

class User {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Library {
    // Danh sách sách và người dùng trong thư viện.
    private books: Book[] = [];
    private users: User[] = [];

    // Thêm sách vào thư viện.
    public addBook(book: Book): void {
        this.books.push(book);
        console.log(`Added book: ${book.title}`);
    }

    // Thêm người dùng vào thư viện.
    public addUser(user: User): void {
        this.users.push(user);
        console.log(`Added user: ${user.name}`);
    }

    // Hiển thị danh sách sách.
    public displayBooks(): void {
        console.log("\n===== BOOK LIST =====");

        this.books.forEach((book, index) => {
            console.log(
                `${index + 1}. ${book.title} - ${book.author}`
            );
        });
    }

    // Hiển thị danh sách người dùng.
    public displayUsers(): void {
        console.log("\n===== USER LIST =====");

        this.users.forEach((user, index) => {
            console.log(`${index + 1}. ${user.name}`);
        });
    }
}

const library = new Library();

library.addBook(new Book("Clean Code", "Robert C. Martin"));
library.addBook(new Book("The Pragmatic Programmer", "Andrew Hunt"));

library.addUser(new User("Than Trong Thang"));

library.displayBooks();
library.displayUsers();
export {};