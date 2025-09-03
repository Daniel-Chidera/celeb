     // Cryptocurrency payment selection
     const cryptoOptions = document.querySelectorAll('.crypto-option');
     const walletDisplays = document.querySelectorAll('.wallet-display');

     cryptoOptions.forEach(option => {
         option.addEventListener('click', () => {
             // Remove previous selections
             cryptoOptions.forEach(opt => opt.classList.remove('selected'));
             walletDisplays.forEach(wallet => wallet.style.display = 'none');
             
             // Select current option
             option.classList.add('selected');
             const crypto = option.dataset.crypto;
             document.getElementById(`${crypto}-wallet`).style.display = 'block';
         });
     });

     // Wallet address copying
     document.querySelectorAll('.wallet-address').forEach(address => {
         address.addEventListener('click', async () => {
             try {
                 await navigator.clipboard.writeText(address.textContent);
                 const originalText = address.textContent;
                 address.textContent = 'Address Copied!';
                 address.style.color = '#48bb78';
                 
                 setTimeout(() => {
                     address.textContent = originalText;
                     address.style.color = '';
                 }, 2000);
             } catch (err) {
                 console.log('Copy failed');
             }
         });
     });

     // Form submission
     document.getElementById('membershipForm').addEventListener('submit', async (e) => {
         e.preventDefault();
         
         const submitBtn = document.getElementById('submitBtn');
         const selectedCrypto = document.querySelector('.crypto-option.selected');
         
         if (!selectedCrypto) {
             alert('Please select a cryptocurrency payment method');
             return;
         }

         // Disable submit button
         submitBtn.disabled = true;
         submitBtn.textContent = 'Processing Application...';

         // Collect form data
         const formData = new FormData(e.target);
         const applicationData = {
             // Personal Information
             firstName: formData.get('firstName'),
             lastName: formData.get('lastName'),
             email: formData.get('email'),
             phone: formData.get('phone'),
             age: formData.get('age'),
             location: formData.get('location'),
             
             // Preferences
             interests: formData.get('interests'),
             experience: formData.get('experience'),
             
             // Payment
             paymentMethod: selectedCrypto.dataset.crypto.toUpperCase(),
             transactionHash: formData.get('transactionHash'),
             
             // Metadata
             applicationDate: new Date().toLocaleString(),
             membershipType: 'VIP Elite Access',
             amount: '$299 USD'
         };

         try {
             // Replace with your Formspree endpoint or email service
             const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                 method: 'POST',
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(applicationData)
             });

             // Show success message
             document.getElementById('membershipForm').style.display = 'none';
             document.getElementById('successMessage').style.display = 'block';
             
         } catch (error) {
             // Fallback success display
             console.log('Application Data:', applicationData);
             document.getElementById('membershipForm').style.display = 'none';
             document.getElementById('successMessage').style.display = 'block';
         }
     });

     // Form validation styling
     const inputs = document.querySelectorAll('input, select, textarea');
     inputs.forEach(input => {
         input.addEventListener('blur', () => {
             if (input.hasAttribute('required') && !input.value) {
                 input.style.borderColor = '#e53e3e';
             } else {
                 input.style.borderColor = '#e2e8f0';
             }
         });
     });