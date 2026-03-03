## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2025-07-25 - Content Security Policy (CSP) Implementation Details
**Vulnerability:** Missing Content Security Policy (CSP) leaving the application vulnerable to XSS and unauthorized data exfiltration.
**Learning:** This AI app has specific technical requirements that make a strict CSP challenging:
1. `script-src 'unsafe-eval'` is required by ONNX Runtime Web (`transformers.js`) for WASM execution.
2. `worker-src blob:` is needed for web workers managed by the transformers library.
3. `style-src 'unsafe-inline'` is necessary because `chatInterface.js` injects HTML strings with inline style attributes (e.g., `style="display: none;"`).
4. Multiple external APIs (OpenAI, Aliyun, Baidu, Zhipu, HuggingFace) must be explicitly whitelisted in `connect-src`.
**Prevention:** Implement a tailored CSP that balances security with the app's specific functional needs, restricting all other sources to `self` or trusted CDNs (`cdn.jsdelivr.net`, `cdnjs.cloudflare.com`).
