window.updateMinicart = function() {
  fetch('/cart?view=minicart')
    .then(function(response) { return response.text(); })
    .then(function(html) {
      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      var newContent = tempDiv.querySelector('.cart-container');
      var minicart = document.querySelector('.cart-container');
      if (minicart && newContent) {
        minicart.innerHTML = newContent.innerHTML;

        cartSettings();
        ajaxItemCart();

        let totalItems = 0;
        const cartItems = minicart.querySelectorAll('.cart-item');
        cartItems.forEach(function(item) {
          const quantity = parseInt(item.querySelector('.total-qtd').textContent);
          totalItems += quantity;
        });
        //Get total qtd of class .total-qtd 
        const badgeItemCount = document.querySelectorAll('[data-cart-qtd]');
        if (badgeItemCount.length > 0) {
          badgeItemCount.forEach(function(badge) {
            badge.textContent = totalItems;
          });
        }
      }
    });
};

window.openMinicart = function() {
  var minicart = document.getElementById('cart-sidebar');
  if (minicart) {
    window.cartSidebar.classList.remove('translate-x-full');
    window.overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function ajaxItemCart() {
  document.querySelectorAll('[data-ajax-cart]').forEach(form => {
    form.addEventListener('submit', function(event) {
      console.log('Form submitted:', form);
      event.preventDefault();
      const fields = new FormData(form);
      const action = form.getAttribute('action');
      const method = form.getAttribute('method') || 'POST';

      fetch(action, {
        method: method,
        body: fields,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log('Cart updated:', data);
      })
      .catch(error => console.error('Error updating cart:', error)).finally(() => {
        window.updateMinicart();
      });
    })
  })
  
}
ajaxItemCart();