// wpp shelf click event
document.querySelectorAll('.wpp-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        setTimeout(() => {
            const link = button.getAttribute('data-link');
            if (link) {
                window.open(link, '_blank');
            }
        }, 600); // Delay to allow for any loading state
    });
});