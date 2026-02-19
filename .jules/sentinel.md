## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - Missing Content Security Policy
**Vulnerability:** The application lacked a Content Security Policy (CSP) in `index.html`, leaving it vulnerable to Cross-Site Scripting (XSS) and data exfiltration.
**Learning:** Relying solely on code-level sanitization (like `formatMessage`) is insufficient. A CSP provides a crucial second layer of defense by restricting where resources can be loaded from and where data can be sent.
**Prevention:** Implement a strict CSP early in development. Whitelist only necessary domains for scripts, styles, and connections (e.g., OpenAI, Hugging Face). Use `report-uri` or `report-to` to monitor violations in production.
