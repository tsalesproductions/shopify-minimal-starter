window.updateMinicart = function() {
  fetch('/cart?view=minicart')
    .then(function(response) { return response.text(); })
    .then(function(html) {
      var minicart = document.getElementById('minicart');
      if (minicart) {
        minicart.innerHTML = html;
      }
    });
};

document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('open-minicart');
  if (btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var minicart = document.getElementById('minicart');
      if (minicart) minicart.style.display = 'block';
    });
  }
}); 