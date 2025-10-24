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

document.addEventListener('DOMContentLoaded', function() {
    const copyCountElement = document.querySelector('.nav-buttons button:last-child span');
    const coinCountElement = document.getElementById('initialCoin');
    const callHistorySection = document.querySelector('#Service-History .p-4.text-center');
    const clearHistoryButton = document.querySelector('#Service-History button');

    // Initialize coin count
    let coins = 100;
    coinCountElement.textContent = coins;

    // Initialize copy count
    let copyCount = 0;
    copyCountElement.textContent = copyCount;

    // Call button functionality
    const callButtons = document.querySelectorAll('button[id$="Call"]');
    callButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get service name and number
            const card = this.closest('.service-card');
            const serviceName = card.querySelector('h1').textContent;
            const serviceNumber = card.querySelector('h1[id$="Num"]').textContent;
            
            // Check if sufficient coins are available
            if (coins < 20) {
                alert('Sufficient coins (Minimum 20 coins) are not available and request cannot be processed.');
                return;
            }
            
            // Deduct coins
            coins -= 20;
            coinCountElement.textContent = coins;
            
            // Show alert
            alert(`Calling ${serviceName} : ${serviceNumber}`);
            
            // Get current time
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            const dateString = now.toLocaleDateString();
            
            // Add to call history
            addToCallHistory(serviceName, serviceNumber, `${dateString} ${timeString}`);
        });
    });

    // Copy button functionality
    const copyButtons = document.querySelectorAll('button[id$="Copy"]');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get service name and number
            const card = this.closest('.service-card');
            const serviceName = card.querySelector('h1').textContent;
            const serviceNumber = card.querySelector('h1[id$="Num"]').textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(serviceNumber).then(() => {
                // Increase copy count
                copyCount++;
                copyCountElement.textContent = copyCount;
                
                // Show alert
                alert(`Copied ${serviceName} number: ${serviceNumber}`);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy number to clipboard');
            });
        });
    });

    // Clear history button functionality
    clearHistoryButton.addEventListener('click', function() {
        // Clear call history
        callHistorySection.innerHTML = '';
        
        // Restore coins to 100
        coins = 100;
        coinCountElement.textContent = coins;
        
        alert('Call history cleared and coins restored to 100');
    });

    // Function to add entry to call history
    function addToCallHistory(serviceName, serviceNumber, callTime) {
        const historyEntry = document.createElement('div');
        historyEntry.className = 'history-entry bg-gray-100 p-3 rounded-lg mb-2 text-left';
        historyEntry.innerHTML = `
            <div class="font-bold text-sm">${serviceName}</div>
            <div class="text-green-600 font-semibold">${serviceNumber}</div>
            <div class="text-gray-500 text-xs">${callTime}</div>
        `;
        
        // If no history exists, remove the placeholder text
        if (callHistorySection.textContent.trim() === '') {
            callHistorySection.innerHTML = '';
        }
        
        callHistorySection.appendChild(historyEntry);
    }
});