// iPhone Frame Toggle Functionality
// Shared across all pages

// Load saved frame mode preference on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedMode = localStorage.getItem('iphone-frame-mode');
    const frame = document.querySelector('.iphone-frame');
    const toggleText = document.getElementById('frameToggleText');

    if (!frame || !toggleText) return;

    // Default to iPhone view unless user explicitly chose normal view
    if (savedMode !== 'normal') {
        frame.classList.add('iphone-mode');
        toggleText.textContent = 'Normal View';
    }
});

// Global function for frame toggle (called from HTML onclick)
function toggleFrameMode() {
    const frame = document.querySelector('.iphone-frame');
    const toggleText = document.getElementById('frameToggleText');

    if (!frame || !toggleText) return;

    if (frame.classList.contains('iphone-mode')) {
        // Switch to Normal View
        frame.classList.remove('iphone-mode');
        toggleText.textContent = 'iPhone View';
        localStorage.setItem('iphone-frame-mode', 'normal');
    } else {
        // Switch to iPhone View
        frame.classList.add('iphone-mode');
        toggleText.textContent = 'Normal View';
        localStorage.setItem('iphone-frame-mode', 'iphone');
    }
}
