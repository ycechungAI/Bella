## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-23 - Missing Content Security Policy
**Vulnerability:** The application lacked a Content Security Policy (CSP), leaving it vulnerable to XSS and data injection attacks.
**Learning:** Adding a CSP requires careful balancing of security and functionality. Specifically, `unsafe-eval` was required for `transformers.js` (ONNX Runtime Web), and `unsafe-inline` was needed for dynamic styling in `chatInterface.js`.
**Prevention:** Implement CSP early in development. When using libraries like ONNX Runtime, be aware of their CSP requirements (like `unsafe-eval` for WASM).
