//    Heart Icon Javascript Functionality 

document.addEventListener('DOMContentLoaded', function() {
    const heartCountElement = document.querySelector('.nav-buttons button:first-child span');
    const heartButtons = document.querySelectorAll('.service-card button .fa-heart, .service-card button .fa-regular');

    heartButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('fa-regular')) {
                this.classList.remove('fa-regular');
                this.classList.add('fa-solid');
                this.style.color = '#dc2626'; 
                
                const currentCount = parseInt(heartCountElement.textContent);
                heartCountElement.textContent = currentCount + 1;
            } else {
                this.classList.remove('fa-solid');
                this.classList.add('fa-regular');
                this.style.color = ''; 
                
                const currentCount = parseInt(heartCountElement.textContent);
                if (currentCount > 0) {
                    heartCountElement.textContent = currentCount - 1;
                }
            }
        });
    });
});


