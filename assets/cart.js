function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

const cartForms = document.querySelectorAll('.cart-form');

cartForms.forEach((form) => {
  const quantityInputs = form.querySelectorAll('input[name="updates[]"]');
  const quantityBtns = form.querySelectorAll('.quantity-btn');

  const updateCart = debounce((line, quantity) => {
    fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        line: line,
        quantity: quantity
      })
    })
    .then(response => response.json())
    .then(data => {
      // You can add more sophisticated updates here, like updating a cart count icon
      // For now, we'll just reload the page to see the changes.
      // A better implementation would update the totals and line items with JS.
      window.location.reload();
    });
  }, 500);

  quantityInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const line = e.target.dataset.line;
      const quantity = e.target.value;
      if (quantity > 0) {
        updateCart(line, quantity);
      }
    });
  });

  quantityBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      const input = e.target.parentElement.querySelector('input');
      const line = input.dataset.line;
      let quantity = parseInt(input.value, 10);

      if (action === 'increment') {
        quantity++;
      } else if (action === 'decrement' && quantity > 1) {
        quantity--;
      }
      
      input.value = quantity;
      updateCart(line, quantity);
    });
  });
});
