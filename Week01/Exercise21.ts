// Exercise 21
// Create a generic Repository class with methods add(), getAll().

class Repository<T> {
    // Danh sách dữ liệu được lưu trong Repository.
    private items: T[] = [];

    // Thêm phần tử vào Repository.
    public add(item: T): void {
        this.items.push(item);
    }

    // Trả về toàn bộ dữ liệu.
    public getAll(): T[] {
        return this.items;
    }
}

class Product {
    constructor(
        public name: string,
        public price: number
    ) {}
}

// Repository chỉ lưu Product.
const productRepository = new Repository<Product>();

productRepository.add(new Product("Keyboard", 120));
productRepository.add(new Product("Mouse", 50));
productRepository.add(new Product("Monitor", 350));

console.log("===== PRODUCT REPOSITORY =====");

productRepository.getAll().forEach((product, index) => {
    console.log(
        `${index + 1}. ${product.name} - ${product.price}`
    );
});
export {};