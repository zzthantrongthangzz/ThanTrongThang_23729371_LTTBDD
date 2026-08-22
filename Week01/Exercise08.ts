// Exercise 08
// Create a Product class with name, price.
// Create an array of products and filter products with price > 100.

class Product {
    public name: string;
    public price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}

// Tạo danh sách sản phẩm.
const products: Product[] = [
    new Product("Mouse", 50),
    new Product("Keyboard", 120),
    new Product("Headphone", 200),
    new Product("USB", 80),
    new Product("Monitor", 350)
];

// Lọc các sản phẩm có giá lớn hơn 100.
const filteredProducts = products.filter(product => product.price > 100);

console.log("===== PRODUCTS WITH PRICE > 100 =====");

filteredProducts.forEach(product => {
    console.log(`${product.name}: ${product.price}`);
});