const preloader = document.querySelector('.preloader ');
if (preloader) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.remove('show');
        }, 1500); // 1000ms = 1 segundo
    });
}