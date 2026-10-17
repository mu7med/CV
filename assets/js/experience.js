document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.experience-card');
    const previewContainer = document.getElementById('experience-preview');

    const previewRole = document.getElementById('preview-role');
    const previewCompany = document.getElementById('preview-company');
    const previewDate = document.getElementById('preview-date');
    const previewBody = document.getElementById('preview-body');

    if (!cards.length || !previewContainer) {
        return;
    }

    function updateCardCues() {
        cards.forEach(c => {
            const isActive = c.classList.contains('active');
            c.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            const cue = c.querySelector('.card-action-cue span');
            if (cue) {
                cue.textContent = isActive ? 'Viewing Details · Click to Close' : 'Inspect Architecture & Impact';
            }
        });
    }

    function showPreview(card, shouldScroll = true) {
        if (card.classList.contains('active')) {
            card.classList.remove('active');
            updateCardCues();
            previewContainer.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                previewContainer.style.display = 'none';
            }, 300);
            return;
        }

        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        updateCardCues();

        const role = card.querySelector('.header-content h4').innerText;
        const company = card.querySelector('.header-content h7').innerText;
        const date = card.querySelector('.header-content .mh-eduyear').innerText;
        const coreFocusEl = card.querySelector('.header-content .core-focus');
        const coreFocus = coreFocusEl ? coreFocusEl.textContent.replace(/\s+/g, ' ').trim() : '';

        const detailsSource = card.querySelector('.card-details').innerHTML;

        previewRole.innerText = role;
        previewCompany.innerText = company;
        previewDate.innerText = date;

        const previewFocus = document.getElementById('preview-focus');
        if (previewFocus) previewFocus.innerText = coreFocus;

        previewBody.innerHTML = detailsSource;

        previewContainer.style.display = 'block';
        previewContainer.style.animation = 'none';
        previewContainer.offsetHeight; /* trigger reflow */
        previewContainer.style.animation = 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';

        if (shouldScroll) {
            const rect = previewContainer.getBoundingClientRect();
            if (rect.bottom > window.innerHeight || rect.top < 0) {
                previewContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }

    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.addEventListener('click', function () {
            showPreview(this, true);
        });
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showPreview(this, true);
            }
        });
    });

    // Auto-select the current role on initial load without forcing a scroll jump
    if (cards.length > 0) {
        showPreview(cards[0], false);
    }
});

