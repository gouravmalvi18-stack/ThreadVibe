///select item and a button to add
const addItemButton = document.querySelectorAll(".btn");

addItemButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    const product = e.target.closest(".item");
    addItem(product);
  });
});

const mainCart = document.querySelector(".main-cart");
const addItem = (product) => {
  const itemName = product.querySelector(".Name").textContent;
  const itemImgSrc = product.querySelector(".imgContainer").children[0].src;
  const pricetext = product.querySelector(".Price").textContent;
  const price = parseInt(pricetext.replace("$", ""));

  // to check whether product is already in the cart
  let cartName = document.querySelectorAll("#cart_itemName");

  for (let item of cartName) {
    if (item.textContent === itemName) {
      alert("Product already in the cart");
      return;
    }
  }
  const cart = document.createElement("div");
  cart.classList.add("Cart-item");

  cart.innerHTML = `
    <div id="Cart-item">

            <div id="CartDetails">
                      <img src="${itemImgSrc}" >
                      <span id="cart_itemName">${itemName}</span>
             </div>
                 <span id="CartItemPrice">Price :$${price}</span>

                  <div id="Addquantity">
                        <button id="decrement">-</button>
                        <span id="itemQuantityNum">1</span>
                        <button id="increment">+</button>
                  </div>
                  
                  <div id="DeleteItem"><i class="fa-solid fa-trash-can"></i></div>
        
      </div>
 `;

  mainCart.appendChild(cart);

  cart.querySelector("#Addquantity").addEventListener("click", function (e) {
    let itemQuantity = cart.querySelector("#itemQuantityNum");
    let quantityNum = itemQuantity.textContent;

    if (e.target.id === "decrement" && quantityNum > 1) {
      quantityNum--;
    } else if (e.target.id === "increment") {
      quantityNum++;
    }

    itemQuantity.textContent = quantityNum;

    updateTotalPrice();
  });

  //  to remove item from the cart
  const RemoveItem = cart.querySelector("#DeleteItem");
  RemoveItem.addEventListener("click", function (item) {
    item.target.parentElement.parentElement.remove();
    UpdateCartCount(-1);
    updateTotalPrice();
  });

  UpdateCartCount(1);
  updateTotalPrice();
};

// update total price
function updateTotalPrice() {
  const TotalPriceElement = document.querySelector("#total");
  const cartItem = mainCart.querySelectorAll("#Cart-item");
  let total = 0;
  cartItem.forEach((cartItem) => {
    const priceElement = cartItem.querySelector("#CartItemPrice");
    const quantityElement = cartItem.querySelector("#itemQuantityNum");
    let price = priceElement.textContent.replace("Price :$", "");
    let quantity = quantityElement.textContent;
    total += price * quantity;
  });
  TotalPriceElement.textContent = total;
}

// update cart count
let CartItemCount = 0;
function UpdateCartCount(change) {
  let CartItemCountElement = document.querySelector("#Shopping_cart-count");
  CartItemCount += change;

  if (CartItemCount > 0) {
    CartItemCountElement.style.visibility = "visible";
    CartItemCountElement.textContent = CartItemCount;
  } else {
    CartItemCountElement.style.visibility = "hidden";
    CartItemCountElement.textContent = "";
  }
}

//checkout button

const checkOutbtn = document.querySelector("#checkoutbtn");

checkOutbtn.addEventListener("click", function checkOut() {
  const MainCartItem = mainCart.querySelectorAll("#Cart-item");
  if (MainCartItem.length === 0) {
    alert("Your Cart is Empty");
    return;
  }
  MainCartItem.forEach((item) => {
    item.remove();
  });
  CartItemCount = 0;
  UpdateCartCount(0);
  updateTotalPrice();

  alert(
    "Thank You!! For Shopping from Our Website. \n Your Order was Successfully Placed",
  );
});

//////cart open and close /
const Cart_Icon = document.querySelector("#Shopping_Cart_Icon");
const Cart_Open = document.querySelector(".cart-model");
const Cart_Close = document.querySelector("#Close-cart");

Cart_Icon.addEventListener("click", function () {
  Cart_Open.classList.add("open-cart");
  console.log("click");
});

Cart_Close.addEventListener("click", function () {
  Cart_Open.classList.remove("open-cart");
});
