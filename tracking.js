/**
 * Event Tracking Script - Horror Theme
 * 
 * This script captures all click events, page views, and page reloads 
 * performed by users across HTML tags and CSS objects and logs them to the console.
 */

// Initialize tracking when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("🩸 Victim tracking initialized 🩸");
    
    // Track initial page view or reload
    trackPageLoad();
    
    // Add click event listeners to all elements
    setupClickTracking();
    
    // Track element visibility
    setupViewTracking();
    
    // Add spooky cursor effect
    setupCursorEffect();
});

/**
 * Format timestamp for logging
 * @returns {string} Formatted timestamp
 */
function getFormattedTimestamp() {
    const now = new Date();
    return now.toISOString();
}

/**
 * Track page load event (both initial loads and reloads)
 */
function trackPageLoad() {
    const timestamp = getFormattedTimestamp();
    const page = document.title || window.location.pathname || "Unknown Page";
    const isReload = window.performance && window.performance.navigation.type === 1;
    
    if (isReload) {
        // This is a reload
        console.log(`${timestamp}, reload, page_reloaded: ${page} | Victim has returned`);
        
        // Special handling for reload.html
        if (window.location.pathname.includes("reload.html")) {
            console.log(`${timestamp}, special_reload, reload.html detected | The ritual continues`);
        }
    } else {
        // This is a fresh page load
        console.log(`${timestamp}, view, page_entered: ${page} | Fresh victim arrived`);
    }
}

/**
 * Setup click tracking for all elements
 */
function setupClickTracking() {
    document.addEventListener('click', function(event) {
        const timestamp = getFormattedTimestamp();
        const target = event.target;
        
        // Determine the type of element clicked
        let elementType = getElementType(target);
        
        // Log the click event with horror theme
        console.log(`${timestamp}, click, ${elementType} | Victim interaction recorded`);
        
        // Add small visual effect on click
        createBloodSplatter(event.clientX, event.clientY);
    });
}

/**
 * Setup view tracking using Intersection Observer
 */
function setupViewTracking() {
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const timestamp = getFormattedTimestamp();
                const elementType = getElementType(entry.target);
                console.log(`${timestamp}, view, ${elementType} | Victim gaze detected`);
            }
        });
    }, {
        threshold: 0.5 // Element is considered viewed when 50% visible
    });
    
    // Track all major elements
    const trackableElements = document.querySelectorAll('section, img, a, button, .education-item, .skill-category, .achievement-item, .technique');
    trackableElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Determine the type of element
 * @param {HTMLElement} element - The DOM element
 * @returns {string} Description of the element type
 */
function getElementType(element) {
    // Get element tag name
    const tagName = element.tagName.toLowerCase();
    
    // Get element ID and class
    const id = element.id ? element.id : '';
    const className = Array.from(element.classList).join(' ');
    
    // For images, return image tag with alt text
    if (tagName === 'img') {
        return `image: ${element.alt || 'unnamed trophy'}`;
    }
    
    // For links, return link with text
    if (tagName === 'a') {
        return `link: ${element.textContent.trim()}`;
    }
    
    // For buttons
    if (tagName === 'button' || (tagName === 'a' && element.classList.contains('cv-button'))) {
        return `button: ${element.textContent.trim()}`;
    }
    
    // For section headers
    if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3') {
        return `heading: ${element.textContent.trim()}`;
    }
    
    // For list items
    if (tagName === 'li') {
        return `list_item: ${element.textContent.trim()}`;
    }
    
    // For education items
    if (element.classList.contains('education-item')) {
        const heading = element.querySelector('h3');
        return `education: ${heading ? heading.textContent : 'unnamed education'}`;
    }
    
    // For skill categories
    if (element.classList.contains('skill-category')) {
        const heading = element.querySelector('h3');
        return `skill_category: ${heading ? heading.textContent : 'unnamed skills'}`;
    }
    
    // For achievement items
    if (element.classList.contains('achievement-item')) {
        const heading = element.querySelector('h4');
        return `achievement: ${heading ? heading.textContent : 'unnamed achievement'}`;
    }
    
    // For sections based on ID
    if (id) {
        return `section: ${id}`;
    }
    
    // General case - return tag name and class if available
    return className ? `${tagName}: ${className}` : tagName;
}

/**
 * Create blood splatter effect at click position
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 */
function createBloodSplatter(x, y) {
    const splatter = document.createElement('div');
    splatter.className = 'blood-splatter';
    splatter.style.left = x + 'px';
    splatter.style.top = y + 'px';
    
    // Add random size and rotation for variation
    const size = 20 + Math.random() * 30;
    const rotation = Math.random() * 360;
    
    splatter.style.width = size + 'px';
    splatter.style.height = size + 'px';
    splatter.style.transform = `rotate(${rotation}deg)`;
    
    // Add CSS for the blood splatter
    splatter.style.position = 'fixed';
    splatter.style.borderRadius = '50%';
    splatter.style.backgroundColor = 'rgba(136, 0, 0, 0.7)';
    splatter.style.boxShadow = '0 0 10px rgba(136, 0, 0, 0.5)';
    splatter.style.pointerEvents = 'none';
    splatter.style.zIndex = '9999';
    splatter.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    
    // Create a more organic shape
    const clipPath = [];
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 50 + Math.random() * 50;
        const pointX = 50 + Math.cos(angle) * radius;
        const pointY = 50 + Math.sin(angle) * radius;
        clipPath.push(`${pointX}% ${pointY}%`);
    }
    splatter.style.clipPath = `polygon(${clipPath.join(', ')})`;
    
    // Add animation
    splatter.style.animation = 'fade-out 2s forwards';
    
    // Add keyframes for fade out
    if (!document.getElementById('blood-splatter-style')) {
        const style = document.createElement('style');
        style.id = 'blood-splatter-style';
        style.textContent = `
            @keyframes fade-out {
                0% { opacity: 0.7; transform: translate(-50%, -50%) rotate(${rotation}deg) scale(0.5); }
                100% { opacity: 0; transform: translate(-50%, -50%) rotate(${rotation}deg) scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(splatter);
    
    // Remove the element after animation completes
    setTimeout(() => {
        splatter.remove();
    }, 2000);
}

/**
 * Setup cursor effect
 */
function setupCursorEffect() {
    // Create custom cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'transparent';
    cursor.style.border = '2px solid #600';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.transition = 'width 0.2s, height 0.2s, background-color 0.2s';
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorDot.style.position = 'fixed';
    cursorDot.style.width = '4px';
    cursorDot.style.height = '4px';
    cursorDot.style.borderRadius = '50%';
    cursorDot.style.backgroundColor = '#900';
    cursorDot.style.pointerEvents = 'none';
    cursorDot.style.zIndex = '10000';
    cursorDot.style.transform = 'translate(-50%, -50%)';
    cursorDot.style.boxShadow = '0 0 5px #f00';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    // Add mouse movement listener
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Change cursor on clickable elements
    document.addEventListener('mouseover', e => {
        if (e.target.tagName.toLowerCase() === 'a' || 
            e.target.tagName.toLowerCase() === 'button' ||
            e.target.classList.contains('cv-button')) {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.backgroundColor = 'rgba(136, 0, 0, 0.1)';
            cursor.style.borderColor = '#900';
        }
    });
    
    document.addEventListener('mouseout', e => {
        if (e.target.tagName.toLowerCase() === 'a' || 
            e.target.tagName.toLowerCase() === 'button' ||
            e.target.classList.contains('cv-button')) {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.borderColor = '#600';
        }
    });
    
    // Add style to hide the default cursor
    const style = document.createElement('style');
    style.textContent = `
        body * {
            cursor: none !important;
        }
    `;
    document.head.appendChild(style);
}

// Listen for page before unload to track navigation away
window.addEventListener('beforeunload', function() {
    const timestamp = getFormattedTimestamp();
    console.log(`${timestamp}, leaving_page, ${document.title || window.location.pathname} | Victim escaping`);
});
