## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-23 - Missing Content Security Policy
**Vulnerability:** The application lacked a Content Security Policy (CSP) header or meta tag, allowing potential execution of malicious scripts from arbitrary sources and unauthorized data exfiltration.
**Learning:** Even client-side AI apps need strict CSPs. AI libraries often require `unsafe-eval` for WASM or optimization, which weakens CSP, so other directives must be as strict as possible (whitelisting only specific API endpoints).
**Prevention:** Implement a strict CSP early in development. For AI apps using libraries like `transformers.js`, explicitly whitelist necessary model CDNs (e.g., Hugging Face) and API endpoints, while keeping `script-src` and `connect-src` as restricted as possible.
