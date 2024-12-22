// Select relevant elements
// Selecting key elements from the DOM for functionality
let iconCart = document.querySelector('.icon-cart'); // The shopping cart icon
let closeCart = document.querySelector('.close'); // Close button in the cart
let body = document.querySelector('body'); // The body element to toggle cart visibility
let listProductHTML = document.querySelectorAll('.products .fig'); // All product elements in the product list
let listCartHTML = document.querySelector('.listCart'); // The container for the cart items
let iconCartspan = document.querySelector('.icon-cart span'); // The badge showing the total count of items in the cart
let cartTotalHTML; // Variable to hold the total price display
let carts = []; // Array to store cart items

// Event listener to toggle cart visibility when the cart icon is clicked
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart'); // Adds/removes the 'showCart' class to show or hide the cart
});

// Event listener to close the cart when the close button is clicked
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Add event listeners to "Add to Cart" buttons for each product
listProductHTML.forEach((product, index) => {
    product.querySelector('.addCart').addEventListener('click', () => {
        // Collect product details
        const productDetails = {
            id: index + 1, // Unique identifier for the product
            name: product.querySelector('img').alt, // Product name from the image's alt text
            price: parseFloat(product.querySelector('p').innerText.replace('$', '')), // Product price as a number
            image: product.querySelector('img').src // Product image source
        };
        addToCart(productDetails); // Add the product to the cart
    });
});

// Function to add a product to the cart
const addToCart = (product) => {
    // Check if the product already exists in the cart
    let existingProductIndex = carts.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
        // If the product exists, increase its quantity
        carts[existingProductIndex].quantity += 1;
    } else {
        // Otherwise, add it as a new item with a quantity of 1
        carts.push({ ...product, quantity: 1 });
    }

    updateCartCount(); // Update the cart count badge
    renderCart(); // Render the updated cart
};

// Function to update the total item count displayed on the cart icon
const updateCartCount = () => {
    const totalItems = carts.reduce((total, item) => total + item.quantity, 0); // Sum up quantities of all items
    iconCartspan.textContent = totalItems; // Update the badge with the total count
};

// Function to render the cart's contents
const renderCart = () => {
    listCartHTML.innerHTML = ''; // Clear existing cart contents

    carts.forEach((item) => {
        // Create a new cart item element for each item in the cart
        const cartItem = document.createElement('div');
        cartItem.classList.add('item');
        cartItem.innerHTML = `
            <div class="image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="name">${item.name}</div>
            <div class="totalPrice">$${(item.price * item.quantity).toFixed(2)}</div> <!-- Display total price for the item -->
            <div class="quantity">
                <span class="minus" data-id="${item.id}">&lt;</span> <!-- Decrease quantity -->
                <span>${item.quantity}</span> <!-- Current quantity -->
                <span class="plus" data-id="${item.id}">&gt;</span> <!-- Increase quantity -->
            </div>
        `;
        listCartHTML.appendChild(cartItem); // Add the item to the cart container
    });

    // Attach event listeners to the minus and plus buttons for quantity adjustment
    document.querySelectorAll('.minus').forEach((button) => {
        button.addEventListener('click', () => {
            adjustQuantity(parseInt(button.dataset.id), -1); // Decrease quantity
        });
    });

    document.querySelectorAll('.plus').forEach((button) => {
        button.addEventListener('click', () => {
            adjustQuantity(parseInt(button.dataset.id), 1); // Increase quantity
        });
    });

    renderTotalPrice(); // Update the total price display
};

// Function to adjust the quantity of a product in the cart
const adjustQuantity = (productId, change) => {
    let productIndex = carts.findIndex((item) => item.id === productId);

    if (productIndex !== -1) {
        carts[productIndex].quantity += change; // Update the quantity

        if (carts[productIndex].quantity <= 0) {
            carts.splice(productIndex, 1); // Remove the product if the quantity is zero or less
        }

        updateCartCount(); // Update the total item count
        renderCart(); // Re-render the cart
    }
};

// Function to render the total price at the bottom of the cart
const renderTotalPrice = () => {
    if (cartTotalHTML) {
        cartTotalHTML.remove(); // Remove the existing total price element if it exists
    }

    const totalPrice = carts.reduce((total, item) => total + item.price * item.quantity, 0); // Calculate the total price
    cartTotalHTML = document.createElement('div');
    cartTotalHTML.classList.add('cart-total');
    cartTotalHTML.innerHTML = `<h3>Total: $${totalPrice.toFixed(2)}</h3>`; // Display the total price
    listCartHTML.appendChild(cartTotalHTML); // Add the total price element to the cart
};

// Initialize by updating the cart count to reflect the initial state
updateCartCount();
