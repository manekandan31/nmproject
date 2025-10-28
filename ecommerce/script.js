const products = [
    { name: "Smartphone", category: "electronics", price: 29999 },
    { name: "Laptop", category: "electronics", price: 89999 },
    { name: "T-Shirt", category: "clothing", price: 499 },
    { name: "Jeans", category: "clothing", price: 1199 },
    { name: "JavaScript Book", category: "books", price: 750 },
    { name: "Headphones", category: "electronics", price: 2500 },
    { name: "Fiction Novel", category: "books", price: 399 },
    { name: "Jacket", category: "clothing", price: 2499 },
    { name: "Tablet", category: "electronics", price: 18500 },
    { name: "Cookbook", category: "books", price: 599 }
];

const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');

function formatINR(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

function displayProducts(filteredProducts) {
    productList.innerHTML = '';

    if (filteredProducts.length === 0) {
        productList.innerHTML = "<p>No products match your criteria.</p>";
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: ${formatINR(product.price)}</p>
        `;

        productList.appendChild(card);
    });
}

function filterProducts() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedPrice = priceFilter.value;

    let filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchText);
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesPrice = (() => {
            if (selectedPrice === 'all') return true;
            const [min, max] = selectedPrice.split('-').map(Number);
            return product.price >= min && product.price <= max;
        })();

        return matchesSearch && matchesCategory && matchesPrice;
    });

    displayProducts(filtered);
}

// Event Listeners
searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('change', filterProducts);

// Initial render
displayProducts(products);
