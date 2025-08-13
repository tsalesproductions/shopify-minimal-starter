// Spinner for loading state
document.querySelectorAll('[data-loading],[data-loading-white]').forEach(button => {
    const timer = button.getAttribute('data-loading-timer') || 1200; // Default to 2 seconds if not specified
    button.addEventListener('click', () => {

        button.classList.add('loading');
        // button.disabled = true;

        // Simulate loading
        setTimeout(() => {
            button.classList.remove('loading');
            // button.disabled = false;
        }, timer); // Adjust time as needed
    });
});