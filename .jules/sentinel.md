## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2025-02-23 - Missing Content Security Policy
**Vulnerability:** Lack of Content Security Policy (CSP) headers or meta tags, allowing potential execution of unauthorized scripts and loading of malicious resources.
**Learning:** Even with client-side escaping, a robust CSP is a critical defense-in-depth layer against XSS and data injection. Modern web apps using complex libraries like `transformers.js` (WASM, workers) require careful CSP crafting (`unsafe-eval`, `worker-src`) rather than omitting it entirely.
**Prevention:** Always implement a strict CSP starting with `default-src 'self'` and whitelisting only necessary external resources (CDNs, APIs).
