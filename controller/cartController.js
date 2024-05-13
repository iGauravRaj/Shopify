const cartList = document.getElementById("cart-list");
const clearCart = document.getElementById("clear-cart");
const placeOrder = document.getElementById("place-order");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to display cart items
function displayCartItems() {
    cartList.innerHTML = "";
    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.className = "align-items-center";

        // Add product image
        const imageContainer = document.createElement('div');
        imageContainer.className = 'col-2';
        const image = document.createElement('img');
        image.src = item.image;
        image.style.width = '100px';
        imageContainer.appendChild(image);

        // Add product details
        const details = document.createElement('div');
        details.className = 'col-10';
        details.innerText = `${item.title} - Price: $${item.price}`;
        
        // Remove product from cart
        const removeBtn = document.createElement('button');
        removeBtn.className = "btn btn-danger removeBtn";
        removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
        removeBtn.style.color = "#fff";

        removeBtn.onclick = function() {
            removeFromCart(item);
        };
        
        // Add horizontal rule
        const hr = document.createElement('hr');
        hr.style.color = "Black";

        // Display product details
        listItem.appendChild(imageContainer);
        listItem.appendChild(details);
        listItem.appendChild(removeBtn);

        cartList.appendChild(listItem);
        cartList.appendChild(hr);

    });
}

// Displays cart items when page loads
displayCartItems();

// Function to clear cart items
function clearCartItems() {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}
clearCart.addEventListener("click", clearCartItems)

// Function to remove each product
function removeFromCart(item) {
    const indexToRemove = cart.findIndex(cartItem => cartItem.id === item.id);

    if (indexToRemove !== -1) {
        cart.splice(indexToRemove, 1);
        
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCartItems();
    }
}

// Function to place order
placeOrder.addEventListener("click", function() {
    if (cart.length === 0) {
      alert("Your cart is empty!\nPlease add items to your cart before placing an order.");
    } else {
      localStorage.removeItem("cart");
      window.location.href = "../public/order_confirmation.html";
    }
  });