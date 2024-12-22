// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
    // Select the signup form from the DOM
    const signupForm = document.querySelector(".signup-form");

    // Select the password and confirm password input fields
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirm-password");

    // Add an event listener to handle the form submission
    signupForm.addEventListener("submit", (event) => {
        // Check if the values of the password and confirm password fields are not the same
        if (passwordField.value !== confirmPasswordField.value) {
            event.preventDefault(); // Prevent the form from submitting
            alert("Passwords do not match. Please try again."); // Show an error message
            confirmPasswordField.focus(); // Set focus back to the confirm password field for user correction
        }
    });
});