## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - Missing Content Security Policy
**Vulnerability:** Missing CSP header in `index.html` allowing potential XSS execution.
**Learning:** Applications using `transformers.js` (ONNX Runtime Web) require `unsafe-eval` in `script-src` and `blob:` in `worker-src`, which complicates the CSP but is necessary for WASM execution.
**Prevention:** Implement a CSP that strictly whitelists necessary CDNs (jsdelivr, cloudflare) and API endpoints while allowing the specific directives required for WASM and web workers.
