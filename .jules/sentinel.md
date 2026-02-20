## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2026-02-20 - Content Security Policy Implementation
**Vulnerability:** Missing Content Security Policy (CSP) headers, exposing the application to potential XSS attacks and unauthorized data exfiltration.
**Learning:** Vanilla JS apps loading external resources (Transformers.js from CDN, Font Awesome) require careful CSP configuration, especially with `unsafe-eval` for WASM and `unsafe-inline` for dynamic styles.
**Prevention:** Implement strict CSP headers early in development, auditing all external connections and script sources.
