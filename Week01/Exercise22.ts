// Exercise 22
// Create a class Stack with push, pop, peek, isEmpty methods.

class Stack<T> {
    private items: T[] = [];

    // Thêm phần tử vào đỉnh Stack.
    public push(item: T): void {
        this.items.push(item);
    }

    // Xóa và trả về phần tử ở đỉnh Stack.
    public pop(): T | undefined {
        return this.items.pop();
    }

    // Xem phần tử ở đỉnh mà không xóa.
    public peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    // Kiểm tra Stack có rỗng hay không.
    public isEmpty(): boolean {
        return this.items.length === 0;
    }
}

const stack = new Stack<number>();

console.log("===== STACK =====");
console.log(`Is empty: ${stack.isEmpty()}`);

stack.push(10);
stack.push(20);
stack.push(30);

console.log(`Top element: ${stack.peek()}`);
console.log(`Pop: ${stack.pop()}`);
console.log(`Top after pop: ${stack.peek()}`);
console.log(`Is empty: ${stack.isEmpty()}`);