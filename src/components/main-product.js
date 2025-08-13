class mainProduct{
    constructor(){
        // Initialize any properties if needed
        console.log(window.currentProduct)
        this.currentProduct = window.currentProduct || {};
    }
    
    quantitySelector(){
        const quantitySelector = document.getElementById('Quantity-'+window.currentSectionId);
        const currentVariantId = document.querySelector('[form-add-to-cart] input[name="id"]') ? document.querySelector('[form-add-to-cart] input[name="id"]').value : '';

        if (quantitySelector) {
            document.querySelector('[data-decrease-quantity]').addEventListener('click', function() {
                const currentValue = parseInt(quantitySelector.value);
                if (currentValue > 1) {
                    quantitySelector.value = currentValue - 1;
                }
            });

            document.querySelector('[data-increase-quantity]').addEventListener('click', function() {
                quantitySelector.value = parseInt(quantitySelector.value) + 1;
            });
        }
    }

    imageSelect(){
        const self = this;
        // Image gallery
        const thumbnails = document.querySelectorAll('.product-image-thumbnail');
        const mainImage = document.getElementById('featured-image');

        $(".product-image-thumbnail").click(function() {
            const mediaId = $(this).attr('data-media-id');
            const media = self.currentProduct.media.find(m => m.id === parseInt(mediaId));
            if (media) {
                $("#featured-image")
                .removeAttr('srcset')
                .attr('src', media.src);
            }
        });
    }

    setError(message){
        if(!message){
            $(".product-message-error").addClass('hidden');
            return;
        }
        $(".product-message-error").removeClass('hidden').find('p').text(message);
    }

    variantPicker(){
        const self = this;
        $(".variant-list input[type='radio']").on('change', function({target}) {
            $(`${'#Quantity-'+window.currentSectionId}`).val(1);
            $(target).closest('.variant-list').find("input[type='radio']").removeAttr('checked');
            $(target).closest('.custom-radio').find("input[type='radio']").attr('checked', 'checked');
            
            self.checkVariantStock();
        })

        $(".variant-list input[type='radio']:checked").trigger('change'); // Trigger change to set initial state
    }

    checkVariantStock(){
        const variantsSelecteds = Array.from($(".variant-list input[type='radio']:checked")).map(input => input.value);
        const variant = this.currentProduct.variants.find(v => v.options.every((option, index) => option === variantsSelecteds[index]));
        if(!variant){
            this.setError("Esta variante não está disponível.");
            document.querySelector('[data-add-to-cart]').setAttribute('disabled', 'disabled');
            return;
        }

        this.updatePrice(variant.id);

        if(variant.available === false){
            this.setError("Esta variante não está disponível.");
            document.querySelector('[data-add-to-cart]').setAttribute('disabled', 'disabled');
            return;
        }

        this.setError("");
        document.querySelector('[data-add-to-cart]').removeAttribute('disabled');
        if(document.querySelector('[form-add-to-cart] input[name="id"]')){
            document.querySelector('[form-add-to-cart] input[name="id"]').value = variant.id;
        }
    }
    

    updatePrice(variantId) {
        $.get(`?sections=product-variant-price&variant=${variantId}`, function(data) {
            data = JSON.parse(data)['product-variant-price']
            const priceContainer = document.querySelector('[data-price-area]');
            const html = new DOMParser().parseFromString(data, 'text/html');

            if (priceContainer) {
                priceContainer.innerHTML = html.querySelector(".shopify-section").innerHTML;
            }
        });
    }
    
    buyWithAjax(){
        const addToCartButton = document.querySelector('[data-add-to-cart]');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', function(event) {
                window.progress.start();
                event.preventDefault();
                const form = document.querySelector('form[action="/cart/add"]');
                const formData = new FormData(form);
                
                fetch('/cart/add.js', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Product added to cart:', data);
                    // Optionally, update the cart UI here
                    window.updateMinicart();
                    window.openMinicart();
                })
                .catch(error => console.error('Error adding product to cart:', error))
                .finally(() => {
                    window.progress.end();
                });
            });
        }
    }

    tabChange(){
        // border-b-2 border-black
        $(".product-tabs button").on('click', function() {
            const tabId = $(this).data('tab');
            $(".product-tabs button").removeClass('border-b-2 border-black').addClass('text-gray-500');
            $(this).removeClass('text-gray-500').addClass('border-b-2 border-black');
            $(".tab-content").addClass('hidden');
            $(`#${tabId}-tab`).removeClass('hidden');
        });
        $(".product-tabs button").first().trigger('click'); // Trigger click to set initial state
    }

    init() {
        this.variantPicker();
        this.quantitySelector();
        this.imageSelect();
        this.buyWithAjax();
        this.tabChange();
    }


}

$(document).ready(function() { 
    new mainProduct().init();
});