const contactForm = document.querySelector("#contact-form");
const contactFields = [...contactForm.querySelectorAll(
    'input[name="name"], input[name="email"], textarea[name="message"]'
)];
let hasSubmitted = false;

const validateField = field => {
    const value = field.value.trim();
    let message = "";

    if (!value) {
        message = `Please enter your ${field.name}.`;
    } else if (field.type === "email" && field.validity.typeMismatch) {
        message = "Please enter a valid email address.";
    }

    const error = field.nextElementSibling;
    error.textContent = message;
    error.hidden = !message;
    field.setAttribute("aria-invalid", String(Boolean(message)));

    return !message;
};

contactFields.forEach(field => {
    const error = document.createElement("span");
    error.className = "field-error";
    error.id = `contact-${field.name}-error`;
    error.hidden = true;
    field.insertAdjacentElement("afterend", error);
    field.setAttribute("aria-describedby", error.id);

    field.addEventListener("input", () => {
        if (hasSubmitted) {
            validateField(field);
        }
    });
});

contactForm.addEventListener("invalid", event => {
    hasSubmitted = true;
    validateField(event.target);
}, true);

contactForm.addEventListener("submit", event => {
    hasSubmitted = true;
    const firstInvalidField = contactFields.find(field => !validateField(field));

    if (firstInvalidField) {
        event.preventDefault();
        firstInvalidField.focus();
    }
});
