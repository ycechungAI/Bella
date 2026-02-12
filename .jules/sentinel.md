## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2026-02-12 - Missing Content Security Policy
**Vulnerability:** The application lacked a Content Security Policy (CSP), allowing unrestricted loading of external scripts, styles, and connections.
**Learning:** Client-side AI applications using libraries like `@xenova/transformers` often require specific CSP exceptions (`unsafe-eval`, `cdn.jsdelivr.net` for ONNX Runtime WASM) that are not immediately obvious without deep inspection of vendor code.
**Prevention:** Implement a strict CSP that whitelists only necessary domains, including specific AI provider endpoints and required CDNs, while keeping `unsafe-eval` constrained to trusted scripts if unavoidable.
