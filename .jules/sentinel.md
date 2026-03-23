## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2025-07-28 - Strict Content Security Policy implementation
**Vulnerability:** A missing Content Security Policy enabled potential attacks like XSS by executing malicious scripts loaded from external sources or inline.
**Learning:** Enforcing a CSP while utilizing dynamic WASM execution and blob workers via `transformers.js` demands the specific inclusion of `script-src 'unsafe-eval'` and `worker-src blob:`. Similarly, UI components that dynamically append unverified inline HTML to style rules require `style-src 'unsafe-inline'`.
**Prevention:** Always deploy a CSP via `meta` tags or HTTP headers that narrowly allows required third-party APIs (`api.openai.com`, etc.), whitelists internal paths, and blocks arbitrary resources.
