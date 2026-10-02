// ================================
// PRODUCT DATA
// ================================

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Audio",
        price: 59.99,
        icon: "🎧",
        description: "Comfortable wireless headphones with clear sound."
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "Wearables",
        price: 89.99,
        icon: "⌚",
        description: "Track your daily activities with a modern smartwatch."
    },

    {
        id: 3,
        name: "Minimal Backpack",
        category: "Lifestyle",
        price: 49.99,
        icon: "🎒",
        description: "A stylish and practical backpack for everyday use."
    },

    {
        id: 4,
        name: "Mechanical Keyboard",
        category: "Technology",
        price: 74.99,
        icon: "⌨️",
        description: "A responsive mechanical keyboard for work and gaming."
    },

    {
        id: 5,
        name: "Desk Lamp",
        category: "Workspace",
        price: 34.99,
        icon: "💡",
        description: "Modern LED desk lamp with adjustable brightness."
    },

    {
        id: 6,
        name: "Coffee Mug",
        category: "Lifestyle",
        price: 19.99,
        icon: "☕",
        description: "Simple ceramic mug designed for your daily coffee."
    }
];


// ================================
// CART
// ================================

let cart = [];


// ================================
// DOM ELEMENTS
// ================================

const productsContainer =
    document.getElementById("productsContainer");

const cartPanel =
    document.getElementById("cartPanel");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const cartButton =
    document.getElementById("cartButton");

const closeCart =
    document.getElementById("closeCart");

const overlay =
    document.getElementById("overlay");

const checkoutButton =
    document.getElementById("checkoutButton");

const checkoutModal =
    document.getElementById("checkoutModal");

const modalClose =
    document.getElementById("modalClose");

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const placeOrder =
    document.getElementById("placeOrder");


// ================================
// DISPLAY PRODUCTS
// ================================

function displayProducts() {

    productsContainer.innerHTML = "";

    products.forEach(function(product) {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="price">
                        $${product.price.toFixed(2)}
                    </span>

                    <button
                        class="add-button"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

        productsContainer.appendChild(card);
    });
}


// ================================
// ADD TO CART
// ================================

function addToCart(productId) {

    const product = products.find(
        function(item) {
            return item.id === productId;
        }
    );

    const existingItem = cart.find(
        function(item) {
            return item.id === productId;
        }
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

    openCart();
}


// ================================
// UPDATE CART
// ================================

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    } else {

        cart.forEach(function(item) {

            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `

                <div class="cart-item-icon">
                    ${item.icon}
                </div>

                <div>

                    <h4>${item.name}</h4>

                    <span class="cart-item-price">
                        $${item.price.toFixed(2)}
                    </span>

                    <div class="quantity-controls">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                        <button
                            class="remove-item"
                            onclick="removeFromCart(${item.id})"
                        >
                            🗑
                        </button>

                    </div>

                </div>

                <strong>
                    $${(item.price * item.quantity).toFixed(2)}
                </strong>
            `;

            cartItems.appendChild(cartItem);

        });
    }

    updateCartSummary();
}


// ================================
// CHANGE QUANTITY
// ================================

function changeQuantity(productId, amount) {

    const item = cart.find(
        function(product) {
            return product.id === productId;
        }
    );

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart = cart.filter(
            function(product) {
                return product.id !== productId;
            }
        );

    }

    updateCart();
}


// ================================
// REMOVE ITEM
// ================================

function removeFromCart(productId) {

    cart = cart.filter(
        function(item) {
            return item.id !== productId;
        }
    );

    updateCart();
}


// ================================
// CART SUMMARY
// ================================

function updateCartSummary() {

    let totalItems = 0;

    let totalPrice = 0;

    cart.forEach(function(item) {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;

    });

    cartCount.textContent = totalItems;

    cartTotal.textContent =
        `$${totalPrice.toFixed(2)}`;
}


// ================================
// OPEN CART
// ================================

function openCart() {

    cartPanel.classList.add("open");

    overlay.classList.add("active");
}


// ================================
// CLOSE CART
// ================================

function closeCartPanel() {

    cartPanel.classList.remove("open");

    overlay.classList.remove("active");
}


// ================================
// CART BUTTON
// ================================

cartButton.addEventListener(
    "click",
    openCart
);

closeCart.addEventListener(
    "click",
    closeCartPanel
);

overlay.addEventListener(
    "click",
    closeCartPanel
);


// ================================
// CHECKOUT MODAL
// ================================

checkoutButton.addEventListener(
    "click",
    function() {

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;
        }

        checkoutItems.innerHTML = "";

        let total = 0;

        cart.forEach(function(item) {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;

            const row =
                document.createElement("div");

            row.className = "checkout-item";

            row.innerHTML = `
                <span>
                    ${item.name} × ${item.quantity}
                </span>

                <strong>
                    $${itemTotal.toFixed(2)}
                </strong>
            `;

            checkoutItems.appendChild(row);

        });

        checkoutTotal.textContent =
            `$${total.toFixed(2)}`;

        checkoutModal.classList.add("active");

    }
);


// ================================
// CLOSE MODAL
// ================================

modalClose.addEventListener(
    "click",
    function() {

        checkoutModal.classList.remove("active");

    }
);


// ================================
// PLACE ORDER
// ================================

placeOrder.addEventListener(
    "click",
    function() {

        alert(
            "🎉 Order placed successfully!"
        );

        cart = [];

        updateCart();

        checkoutModal.classList.remove("active");

        closeCartPanel();

    }
);


// ================================
// START APP
// ================================

displayProducts();
updateCart();