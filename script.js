// List of random characters to be used to replace text
const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// Function to generate random text of a certain length
function generateRandomText(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * randomChars.length);
        result += randomChars[randomIndex];
    }
    return result;
}

// Main function for random text animation
function animateRandomText(elementId, originalText, duration = 2000) {
    const element = document.getElementById(elementId);
    const originalLength = originalText.length;
    let interval;

    // Phase 1: Convert text to random characters
    let randomPhaseDuration = duration / 2; // Half the total duration
    let startTime = Date.now();

    interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime >= randomPhaseDuration) {
            clearInterval(interval);
            restoreOriginalText();
        } else {
            element.textContent = generateRandomText(originalLength);
        }
    }, 50); // Change every 50ms

    // Phase 2: Revert to original text
    function restoreOriginalText() {
        let restoreStartTime = Date.now();
        let restoreInterval = setInterval(() => {
            const elapsedTime = Date.now() - restoreStartTime;
            if (elapsedTime >= randomPhaseDuration) {
                clearInterval(restoreInterval);
                element.textContent = originalText; // Revert to original text
            } else {
                element.textContent = generateRandomText(originalLength);
            }
        }, 50); // Change every 50ms
    }
}

// Run animation when page loads
document.addEventListener("DOMContentLoaded", () => {
    const originalText = "You have successfully logged in.";
    animateRandomText("random-text", originalText);
});