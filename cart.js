document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalAmount = document.getElementById("total-amount");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <img src="../${item.image}" alt="${item.name}">
        <div class="item-details">
          <h3>${item.name}</h3>
          <div class="qty-price">
            <div class="quantity">
              <button class="decrease" data-index="${index}">-</button>
              <span class="qty">${item.quantity}</span>
              <button class="increase" data-index="${index}">+</button>
            </div>
            <div style="display: flex;">
              <p>$</p>
              <p class="item-total">${itemTotal.toFixed(2)}</p>
            </div>
          </div>
          <a href="#" class="remove" data-index="${index}">Remove</a>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    totalAmount.textContent = `$${total.toFixed(2)}`;
    attachEventListeners();
  }

  function attachEventListeners() {
    const increaseBtns = document.querySelectorAll(".increase");
    const decreaseBtns = document.querySelectorAll(".decrease");
    const removeLinks = document.querySelectorAll(".remove");

    increaseBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        cart[index].quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });

    decreaseBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });

    removeLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const index = link.getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });
  }

  renderCart();
});
