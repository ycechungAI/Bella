## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2025-03-15 - Content Security Policy (CSP) Implementation
**Vulnerability:** The application lacked a Content Security Policy (CSP), making it vulnerable to XSS and data exfiltration, especially given the dynamic creation of UI elements using `innerHTML` and loading models/scripts from CDNs.
**Learning:** Due to the application's reliance on ONNX Runtime WebAssembly execution and dynamic UI styling, a strict CSP required specific allowances: `script-src 'unsafe-eval'` for WASM, `style-src 'unsafe-inline'` for dynamically injected styles in `chatInterface.js`, and `worker-src blob:` / `connect-src blob:` to support local model execution and web workers.
**Prevention:** Implement a strict CSP that uses the principle of least privilege, explicitly whitelisting only necessary domains (like `cdn.jsdelivr.net`, `cdnjs.cloudflare.com`, and cloud AI provider APIs) and avoiding overly permissive directives like `default-src *`.
