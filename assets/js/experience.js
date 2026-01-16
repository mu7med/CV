
document.addEventListener('DOMContentLoaded', function () {
    console.log("Experience Master-Detail Script Loaded");

    // Select all experience cards
    const cards = document.querySelectorAll('.experience-card');
    const previewContainer = document.getElementById('experience-preview');

    // Preview Elements
    const previewRole = document.getElementById('preview-role');
    const previewCompany = document.getElementById('preview-company');
    const previewDate = document.getElementById('preview-date');
    const previewBody = document.getElementById('preview-body');

    if (!cards.length || !previewContainer) {
        console.warn("Experience elements not found.");
        return;
    }

    // Function to populate and show preview
    function showPreview(card) {
        // Toggle Logic: If clicking the already active card, close it.
        if (card.classList.contains('active')) {
            card.classList.remove('active');
            previewContainer.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                previewContainer.style.display = 'none';
            }, 300);
            return;
        }

        // 1. Manage Active State
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        // 2. Extract Data
        const role = card.querySelector('.header-content h4').innerText;
        const company = card.querySelector('.header-content h7').innerText;
        const date = card.querySelector('.header-content .mh-eduyear').innerText;
        // Extract hidden focus text safely and normalize whitespace
        const coreFocusEl = card.querySelector('.header-content .core-focus');
        // Use textContent to get text even if hidden, then squash whitespace
        const coreFocus = coreFocusEl ? coreFocusEl.textContent.replace(/\s+/g, ' ').trim() : '';

        // Clone the details content (Tech Stack & Impact)
        const detailsSource = card.querySelector('.card-details').innerHTML;

        // 3. Populate Preview
        previewRole.innerText = role;
        previewCompany.innerText = company;
        previewDate.innerText = date;
        // Populate focus text
        const previewFocus = document.getElementById('preview-focus');
        if (previewFocus) previewFocus.innerText = coreFocus;

        previewBody.innerHTML = detailsSource; // Use innerHTML to preserve HTML structure

        // 4. Show and Animate
        previewContainer.style.display = 'block';

        // Reset animation to re-trigger it
        previewContainer.style.animation = 'none';
        previewContainer.offsetHeight; /* trigger reflow */
        previewContainer.style.animation = 'fadeIn 0.5s ease forwards';

        // 5. Smooth Scroll to Preview (especially for mobile)
        // Only scroll if the preview is not reasonably visible
        const rect = previewContainer.getBoundingClientRect();
        if (rect.bottom > window.innerHeight || rect.top < 0) {
            previewContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    // Attach Click Handlers
    cards.forEach(card => {
        card.addEventListener('click', function () {
            showPreview(this);
        });
    });

    // Optional: Auto-select the first card on load?
    // Let's leave it empty initially to encourage interaction, or select current role.
    // Uncomment below to auto-select first:
    // if(cards.length > 0) showPreview(cards[0]);
});
