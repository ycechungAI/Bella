## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - Transformers.js Content Security Policy
**Vulnerability:** Missing Content Security Policy (CSP) allowed potential XSS and data exfiltration.
**Learning:** `transformers.js` (via ONNX Runtime Web) requires specific CSP directives: `script-src 'unsafe-eval'` (for WASM), `worker-src blob:` (for web workers), and `connect-src` to CDN/model hubs.
**Prevention:** Use a strict CSP but allow necessary WASM/Worker directives when using client-side AI libraries.
