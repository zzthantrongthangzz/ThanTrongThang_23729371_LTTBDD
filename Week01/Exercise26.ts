// Exercise 26
// Create a class Order with list of products.
// Add method to calculate total price.

class Product {
    public name: string;
    public price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}

class Order {
    private products: Product[];

    constructor(products: Product[] = []) {
        this.products = products;
    }

    // Thêm sản phẩm vào đơn hàng.
    public addProduct(product: Product): void {
        this.products.push(product);
    }

    // Tính tổng giá trị của tất cả sản phẩm.
    public calculateTotal(): number {
        return this.products.reduce(
            (total, product) => total + product.price,
            0
        );
    }

    // Hiển thị danh sách sản phẩm.
    public displayOrder(): void {
        console.log("===== ORDER =====");

        this.products.forEach((product, index) => {
            console.log(
                `${index + 1}. ${product.name} - ${product.price}`
            );
        });

        console.log(`Total price: ${this.calculateTotal()}`);
    }
}

const order = new Order();

order.addProduct(new Product("Keyboard", 120));
order.addProduct(new Product("Mouse", 50));
order.addProduct(new Product("Monitor", 350));

order.displayOrder();
export {};