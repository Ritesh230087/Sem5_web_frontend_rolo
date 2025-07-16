let incrementCartCountCallback = null;

export function setIncrementCartCountCallback(cb) {
  incrementCartCountCallback = cb;
}

export function incrementCartCount(amount = 1) {
  if (incrementCartCountCallback) {
    incrementCartCountCallback(amount);
  }
}

export function getCartItems() {
  const items = localStorage.getItem("cart");
  return items ? JSON.parse(items) : [];
}

export function getCartCount() {
  const items = getCartItems();
  return items.length; 
}

export function addToCart(item) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const index = cart.findIndex(ci => ci.id === item.id);
  if (index !== -1) {
    cart[index].quantity += item.quantity;
  } else {
    cart.push(item);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
}

export function updateCartItemQuantity(productId, newQty) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart[index].quantity = newQty;
    if (newQty <= 0) {
      cart.splice(index, 1); 
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  }
}

export function clearCart() {
  localStorage.removeItem("cart");
  window.dispatchEvent(new Event("cartUpdated"));
  if (incrementCartCountCallback) {
    incrementCartCountCallback(0);
  }
}
