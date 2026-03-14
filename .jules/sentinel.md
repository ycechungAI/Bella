## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - Missing Content Security Policy
**Vulnerability:** Lack of Content Security Policy (CSP) allowed potentially untrusted scripts to be executed, inline scripts/styles, and unverified external resources.
**Learning:** Modern web apps with dynamic UI generation require explicitly defined CSPs. `script-src 'unsafe-eval'` was necessary due to transformers.js and `style-src 'unsafe-inline'` due to dynamic UI element visibility toggles (e.g. `style="display: none;"`).
**Prevention:** Always implement a strict CSP via meta tag or HTTP headers, whitelisting specific origins (like `cdn.jsdelivr.net` for libraries) and `blob:` for workers and media when necessary, rather than allowing `*`.
