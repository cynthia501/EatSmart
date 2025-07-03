const slider = document.querySelector('.image-slider');
const slides = document.querySelectorAll('.slide');
let index = 0;
let direction = 1; // 1 means forward, -1 means backward

setInterval(() => {
  index += direction;

  if (index >= slides.length) {
    index = slides.length - 2; // step back to the one before last
    direction = -1; // reverse
  }

  if (index < 0) {
    index = 1; // step forward to second
    direction = 1; // reverse
  }

  slider.scrollTo({
    left: slides[index].offsetLeft,
    behavior: 'smooth'
  });
}, 3000);

//Hamburger for mobile
 const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('show');
    });

    //adding to cart script
     function updateCartCount() {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let count = cart.reduce((total, item) => total + item.quantity, 0);
      document.getElementById("cart-count").innerText = count;
      document.getElementById("cart-count-mobile").innerText = count;
    }

    document.addEventListener("DOMContentLoaded", () => {
      updateCartCount();

      const cartButtons = document.querySelectorAll(".add-to-cart");

      cartButtons.forEach(button => {
        button.addEventListener("click", () => {
          const name = button.getAttribute("data-name");
          const price = parseFloat(button.getAttribute("data-price"));
          const image = button.getAttribute("data-image");

          let cart = JSON.parse(localStorage.getItem("cart")) || [];

          const existingItem = cart.find(item => item.name === name);
          if (existingItem) {
            existingItem.quantity++;
          } else {
            cart.push({ name, price, image, quantity: 1 });
          }

          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartCount();
        });
      });
    });
