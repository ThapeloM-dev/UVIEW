const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
const cartContent = document.querySelector(".cart-content");

cartIcon.addEventListener("click", () => cart.classList.add("activate"));
cartClose.addEventListener("click", () => cart.classList.remove("activate"));

const addCartButtons = document.querySelectorAll(".product-box .add-cart");

addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.currentTarget.closest(".product-box");
        addToCart(productBox);
    });
});


const addToCart = productBox => {
    const productImageSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItems){
        if (item.textContent === productTitle){
            alert("This item is already in the cart.");
            return;
        }
     }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML=`
    <img src="${productImageSrc}" class="cart-img">
                <div class="cart-detail">
                    <h2 class="cart-product-title">${productTitle}</h2>
                    <span class="cart-price">${productPrice}</span>
                    <div class="cart-quantity">
                        <button class="decrement">-</button>
                        <span class="number">1</span>
                        <button class="increment">+</button>
                    </div>
                </div>
                <i class="ri-delete-bin-line cart-remove"></i>
    `;

    cartContent.appendChild(cartBox);

    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();
        updateTotalPrice();
    });

    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector(".decrement");
        let quantity = Number(numberElement.textContent);

        if (event.target.closest(".decrement") && quantity > 1){
            quantity--;
            if (quantity === 1){
                decrementButton.style.color = "#999";
            }
        }
        else if (event.target.closest(".increment")) {
            quantity++;
            decrementButton.style.color = "#333"
        }

        numberElement.textContent = quantity;
        updateTotalPrice();
    });
    updateTotalPrice();
};

const updateTotalPrice = () => {
    const totalPriceElements = document.querySelector(".total-price");
    const cartBox = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    cartBox.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        const price = priceElement.textContent.replace("R","");
        const quantity = Number(quantityElement.textContent);
        total += price * quantity;
    });
    totalPriceElements.textContent = `R${total}`;
}
