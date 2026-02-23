## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - Missing Content Security Policy
**Vulnerability:** The application lacked a Content Security Policy (CSP), making it vulnerable to XSS and data injection attacks if input sanitization failed.
**Learning:** Modern web apps using WASM (like ONNX Runtime) and dynamic UI generation often require specific CSP relaxations (`unsafe-eval`, `unsafe-inline`), but these should be minimized.
**Prevention:** Implemented a strict CSP that whitelists only necessary domains (CDN for WASM, FontAwesome) and schemes (blob:, data:), while blocking everything else by default.
