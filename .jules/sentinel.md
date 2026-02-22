## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - Content Security Policy (CSP) Implementation
**Vulnerability:** Lack of Content Security Policy (CSP) allowing potential XSS and unrestricted data exfiltration.
**Learning:** Client-side AI applications using WASM (like ONNX Runtime) require 'unsafe-eval' in 'script-src' and 'blob:' in 'worker-src', which complicates the CSP but is necessary for functionality.
**Prevention:** Implemented a strict CSP in 'index.html' whitelisting specific AI API endpoints and CDN resources while restricting everything else.
