document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBIL MENÜ TOGGLE ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });

        // Menü linklerinden birine tıklandığında menüyü kapat (Mobil UX)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if(window.innerWidth < 768) {
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    // --- 2. FAQ AKORDEON MANTIĞI ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            // Diğer açık akordeonları kapat (Opsiyonel ama temiz durur)
            document.querySelectorAll('.accordion-content').forEach(item => {
                if (item !== content) {
                    item.style.maxHeight = null;
                    item.previousElementSibling.setAttribute('aria-expanded', 'false');
                }
            });

            // Tıklananı aç/kapat
            if (isExpanded) {
                header.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = null;
            } else {
                header.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- 3. FORM VALIDASYONU (Clean Validation) ---
    const leadForm = document.getElementById('lead-form');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Sayfa yenilemesini durdur
            
            let isValid = true;
            
            // Input tanımlamaları
            const nameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('email');
            
            // Error span tanımlamaları
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');

            // Regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // İsim Kontrolü
            if (nameInput.value.trim() === '') {
                nameInput.setAttribute('aria-invalid', 'true');
                nameError.classList.add('show');
                isValid = false;
            } else {
                nameInput.setAttribute('aria-invalid', 'false');
                nameError.classList.remove('show');
            }

            // E-Posta Kontrolü
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.setAttribute('aria-invalid', 'true');
                emailError.classList.add('show');
                isValid = false;
            } else {
                emailInput.setAttribute('aria-invalid', 'false');
                emailError.classList.remove('show');
            }

            // Eğer validasyon başarılıysa
            if (isValid) {
                // Burada fetch/axios ile API'ye data gönderimi yapılır.
                const btn = leadForm.querySelector('button[type="submit"]');
                const originalText = btn.textContent;
                
                btn.textContent = 'Talebiniz Alındı ✓';
                btn.style.backgroundColor = '#ffffff'; // Onay rengi
                
                // Formu sıfırla
                leadForm.reset();
                
                // Butonu eski haline getir
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                }, 3000);
            }
        });
        
        // Kullanıcı yazarken hatayı canlı olarak kaldırma (Daha iyi UX)
        const inputs = leadForm.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if(input.value.trim() !== '') {
                    input.setAttribute('aria-invalid', 'false');
                    const errorSpan = document.getElementById(`${input.id}-error`);
                    if(errorSpan) errorSpan.classList.remove('show');
                }
            });
        });
    }
});