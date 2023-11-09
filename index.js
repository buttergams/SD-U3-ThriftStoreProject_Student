//? This array is not to be changed.
const salesTax = [
    {state: 'Alabama', tax: .04},
    {state: 'Alaska', tax: .00},
    {state: 'Arizona', tax: .056},
    {state: 'Arkansas', tax: .065},
    {state: 'California', tax: .0725},
    {state: 'Colorado', tax: .029},
    {state: 'Connecticut', tax: .0635},
    {state: 'Delaware', tax: .00},
    {state: 'DC', tax: .06},
    {state: 'Florida', tax: .06},
    {state: 'Georgia', tax: .04},
    {state: 'Hawaii', tax: .04166},
    {state: 'Idaho', tax: .06},
    {state: 'Illinois', tax: .0625},
    {state: 'Indiana', tax: .07},
    {state: 'Iowa', tax: .06},
    {state: 'Kansas', tax: .065},
    {state: 'Kentucky', tax: .06},
    {state: 'Louisiana', tax: .0445},
    {state: 'Maine', tax: .055},
    {state: 'Maryland', tax: .06},
    {state: 'Massachusetts', tax: .0625},
    {state: 'Michigan', tax: .06},
    {state: 'Minnesota', tax: .06875},
    {state: 'Mississippi', tax: .07},
    {state: 'Missouri', tax: .04225},
    {state: 'Montana', tax: .00},
    {state: 'Nebraska', tax: .055},
    {state: 'Nevada', tax: .0685},
    {state: 'New Hampshire', tax: .00},
    {state: 'New Jersey', tax: .06625},
    {state: 'New Mexico', tax: .05125},
    {state: 'New York', tax: .04},
    {state: 'North Carolina', tax: .0475},
    {state: 'North Dakota', tax: .05},
    {state: 'Ohio', tax: .0575},
    {state: 'Oklahoma', tax: .045},
    {state: 'Oregon', tax: .00},
    {state: 'Pennsylvania', tax: .06},
    {state: 'Rhode Island', tax: .07},
    {state: 'South Carolina', tax: .06},
    {state: 'South Dakota', tax: .06},
    {state: 'Tennessee', tax: .07},
    {state: 'Texas', tax: .0625},
    {state: 'Utah', tax: .061},
    {state: 'Vermont', tax: .06},
    {state: 'Virginia', tax: .053},
    {state: 'Washington', tax: .065},
    {state: 'West Virginia', tax: .06},
    {state: 'Wisconsin', tax: .05},
    {state: 'Wyoming', tax: .04},
];

//* Product class
class Product {
    constructor(upc, name, type, purchasePrice, quantity = 1) {
        this.upc = upc;
        this.name = name;
        this.type = type;
        this.purchasePrice = purchasePrice;
        this.quantity = quantity;
        this.marketPrice = 0;
    }

    updateMarketPrice(markupPercentage) {
        this.marketPrice = this.purchasePrice + (this.purchasePrice * markupPercentage);
    }
}

//* Store class
class Store {
    constructor(name, city, state, saleTax) {
        this.name = name;
        this.location = {
            city: city,
            state: state
        };
        this.salesTax = saleTax;
        this.inventory = [];
        this.balance = 200;
        this.expenses = 0;
        this.profit = 0;
        this.paidTax = 0;
    }

    static createStore(name, city, state, saleTax) {
        return new Store(name, city, state, saleTax);
    }

    addItemToInventory(product, markupPercentage) {
        const existingProduct = this.inventory.find(item => item.upc === product.upc);

        if (existingProduct) {
            existingProduct.quantity += product.quantity;
        } else {
            product.updateMarketPrice(markupPercentage);
            this.inventory.push(product);
            this.balance -= product.purchasePrice * product.quantity;
        }
    }

    sellItem(upc, quantity, markupPercentage) {
        const product = this.inventory.find(item => item.upc === upc);

        if (product && product.quantity >= quantity) {
            product.updateMarketPrice(markupPercentage); // Update market price before selling
            product.quantity -= quantity;
            const totalPrice = product.marketPrice * quantity;
            const purchaseCost = product.purchasePrice * quantity;
            this.balance += totalPrice;
            this.profit += totalPrice - purchaseCost;
            this.expenses += purchaseCost;
            this.paidTax += totalPrice * this.salesTax;
        } else {
            console.log(`Error: Item with UPC ${upc} is out of stock.`);
        }
    }
}

// Tax data for different states
const saleTax = {
    "Vermont": 0.06,
    "Maine": 0.055,
    "New Hampshire": 0 // New Hampshire has no sales tax
};

//! First Store
const store1 = Store.createStore("Green Mountain Thrift", "Burlington", "Vermont", saleTax["Vermont"]);

// Create products
const spoon = new Product(1, "Spoon", "Kitchenware", 1.5, 10);
const book = new Product(2, "Book", "Books", 3, 5);
const toyCar = new Product(3, "Toy Car", "Toys", 2, 8);

// Add products to inventory with different markup percentages
store1.addItemToInventory(spoon, 0.3);
store1.addItemToInventory(book, 0.4);
store1.addItemToInventory(toyCar, 0.25);

// Sell items from the inventory
store1.sellItem(1, 5, 0.3);

//! Second Store
const store2 = Store.createStore("Pine Tree Bargains", "Portland", "Maine", saleTax["Maine"]);

// Create products
const fork = new Product(1, "Fork", "Kitchenware", 1.2, 15);
const mug = new Product(2, "Mug", "Kitchenware", 2, 7);
const toyTruck = new Product(3, "Toy Truck", "Toys", 4, 9);

// Add products to inventory with different markup percentages
store2.addItemToInventory(toyTruck, 0.35);
store2.addItemToInventory(mug, 0.4);

// Attempt to sell an item with insufficient quantity
store2.sellItem(2, 10, 0.3);

//! Third Store
const store3 = Store.createStore("Granite State Finds", "Manchester", "New Hampshire", saleTax["New Hampshire"]);

// Create products
const plate = new Product(1, "Plate", "Kitchenware", 1.8, 12);
const toyDoll = new Product(2, "Toy Doll", "Toys", 2.5, 6);
const toyPlane = new Product(3, "Toy Plane", "Toys", 5, 6);

// Add products to inventory with different markup percentages
store3.addItemToInventory(plate, 0.25);
store3.addItemToInventory(toyPlane, 0.3);

// Sell items from the inventory
store3.sellItem(1, 8, 0.25);

//! Testing
console.log(store1);
console.log(store2);
console.log(store3);
