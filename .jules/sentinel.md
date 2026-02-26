## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - CSP Configuration for Transformers.js
**Vulnerability:** Missing Content Security Policy allowed potential XSS and data exfiltration.
**Learning:** `transformers.js` (via ONNX Runtime Web) requires `script-src 'unsafe-eval'` for WASM compilation and `worker-src blob:` for web workers, which must be explicitly allowed in the CSP. Standard strict CSPs break this functionality.
**Prevention:** When using client-side AI libraries like ONNX Runtime, ensure the CSP accommodates WASM execution requirements while maintaining strictness elsewhere.
