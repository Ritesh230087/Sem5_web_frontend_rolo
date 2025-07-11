export function flyProductImageFromButtonToCart(button, imageElement, cartIcon) {
  const buttonRect = button.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();
  const imageRect = imageElement.getBoundingClientRect();

  const clone = imageElement.cloneNode(true);
  const style = clone.style;

  style.position = "fixed";
  style.zIndex = 9999;
  style.pointerEvents = "none";
  style.borderRadius = "12px";
  style.width = `${imageRect.width}px`;
  style.height = `${imageRect.height}px`;

  // Start position: center of add-to-cart button
  style.left = `${buttonRect.left + buttonRect.width / 2 - imageRect.width / 2}px`;
  style.top = `${buttonRect.top + buttonRect.height / 2 - imageRect.height / 2}px`;

  // Add design class
  clone.classList.add("fancy-flying-image");

  document.body.appendChild(clone);

  // Move slightly left (offsetX) to precisely touch cart
  const offsetX = -3; // Adjust left/right landing
  const translateX =
    cartRect.left + cartRect.width / 2 - (buttonRect.left + buttonRect.width / 2) + offsetX;
  const translateY =
    cartRect.top + cartRect.height / 2 - (buttonRect.top + buttonRect.height / 2);

  requestAnimationFrame(() => {
    style.transform = `translate(${translateX}px, ${translateY}px) scale(0.05)`;
    style.opacity = "0.2";
  });

  setTimeout(() => {
    clone.remove();
  }, 800);
}

