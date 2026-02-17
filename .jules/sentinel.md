## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - Missing Content Security Policy
**Vulnerability:** The application lacked a Content Security Policy (CSP), leaving it vulnerable to XSS and data exfiltration.
**Learning:** Even with input sanitization, defense-in-depth is crucial. The app relies on several external APIs (OpenAI, etc.) and CDN resources (fonts, ONNX runtime).
**Prevention:** Implement a strict CSP that explicitly allows only necessary sources for scripts, styles, fonts, and connections. This limits the impact of any potential XSS vulnerability.
