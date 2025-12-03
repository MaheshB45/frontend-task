// Get references
const optionCards = document.querySelectorAll(".option-card");
const totalAmountEl = document.getElementById("totalAmount");
const addToCartBtn = document.getElementById("addToCartBtn");

// Initialize total based on default active option
updateTotal();

// Attach click listeners to each card
optionCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    // If user clicked inside a select or label, do not re-toggle radio weirdly
    const target = event.target;
    if (target.tagName === "SELECT" || target.tagName === "OPTION") return;

    setActiveCard(card);
  });

  // Also toggle when radio itself is clicked
  const radio = card.querySelector(".plan-radio");
  radio.addEventListener("click", (event) => {
    event.stopPropagation();
    setActiveCard(card);
  });
});

// Make selected card active, others inactive
function setActiveCard(card) {
  optionCards.forEach((c) => {
    const body = c.querySelector(".option-body");
    const radio = c.querySelector(".plan-radio");
    if (c === card) {
      c.classList.add("active");
      radio.checked = true;
    } else {
      c.classList.remove("active");
      radio.checked = false;
    }
  });

  updateTotal();
}

// Update total based on active card
function updateTotal() {
  const activeCard = document.querySelector(".option-card.active");
  if (!activeCard) return;

  const price = Number(activeCard.getAttribute("data-price") || 0);
  const formatted = `$${price.toFixed(2)} USD`;
  totalAmountEl.textContent = formatted;
}

// Simple handler for add to cart
addToCartBtn.addEventListener("click", () => {
  const activeCard = document.querySelector(".option-card.active");
  if (!activeCard) return;

  const option = activeCard.getAttribute("data-option");
  const price = activeCard.getAttribute("data-price");

  // For demo: show simple summary. In real app you'd send this to backend.
  alert(`Selected option: ${option} Unit(s)\nTotal: $${Number(price).toFixed(
    2
  )} USD`);
});
