class CollectionFilters extends HTMLElement {
  constructor() {
    super();
    this.form = this.querySelector('form');
    this.form.addEventListener('submit', this.onSubmit.bind(this));
    this.form.addEventListener('input', this.onInput.bind(this));
  }

  onSubmit(event) {
    event.preventDefault();
    this.renderPage(this.getFilterParams());
  }

  onInput(event) {
    // You can add a debounce function here to avoid firing too many requests
    this.renderPage(this.getFilterParams());
  }

  getFilterParams() {
    const formData = new FormData(this.form);
    return new URLSearchParams(formData).toString();
  }

  renderPage(params) {
    const url = `${window.location.pathname}?${params}`;
    this.updateURL(url);
    this.renderContent(url);
  }

  renderContent(url) {
    const sectionId = this.dataset.id;
    const productsGrid = document.getElementById('products-grid');
    const pagination = document.querySelector('.pagination-wrapper'); // Adjust selector if needed

    fetch(url)
      .then(response => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'html.parser');
        const newProductsGrid = html.getElementById('products-grid');
        const newPagination = html.querySelector('.pagination-wrapper');

        if (newProductsGrid) {
          productsGrid.innerHTML = newProductsGrid.innerHTML;
        }

        if (newPagination && pagination) {
          pagination.innerHTML = newPagination.innerHTML;
        } else if (pagination) {
          pagination.innerHTML = '';
        }
      });
  }

  updateURL(url) {
    window.history.pushState({ path: url }, '', url);
  }
}

customElements.define('collection-filters', CollectionFilters);
