## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - Missing CSP and Inline Styles
**Vulnerability:** Lack of Content Security Policy (CSP) allowed potential XSS to execute arbitrary scripts and exfiltrate API keys.
**Learning:**  used inline styles () within HTML template strings, which required  to function if a CSP were added.
**Prevention:** Refactor inline styles to CSS classes or set them via JavaScript () after element creation. This allows for a stricter CSP without .

## 2024-05-24 - Missing CSP and Inline Styles
**Vulnerability:** Lack of Content Security Policy (CSP) allowed potential XSS to execute arbitrary scripts and exfiltrate API keys.
**Learning:** `chatInterface.js` used inline styles (`style="display: none;"`) within HTML template strings, which required `'unsafe-inline'` to function if a CSP were added.
**Prevention:** Refactor inline styles to CSS classes or set them via JavaScript (`element.style.display = 'none'`) after element creation. This allows for a stricter CSP without `'unsafe-inline'`.
