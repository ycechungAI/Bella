## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - Content Security Policy (CSP) Implementation for AI Models
**Vulnerability:** Missing Content Security Policy (CSP) headers in `index.html` allowing potentially arbitrary scripts, styles, and untrusted domains to execute and interact with the application.
**Learning:** Due to the use of ONNX Runtime Web via `transformers.js`, the CSP must explicitly permit `script-src 'unsafe-eval'` for WASM execution and `worker-src 'self' blob:` for Web Worker initialization. Furthermore, dynamic UI components injecting inline styles necessitate `style-src 'unsafe-inline'`. Cloud API endpoints (OpenAI, Aliyun, Baidu, Zhipu, HuggingFace) must be strictly whitelisted in `connect-src`.
**Prevention:** Always implement a strict CSP that balances the tightest possible security restrictions with the specific execution needs of modern browser-based AI models and dynamic UI frameworks.
## 2025-02-23 - Missing Content Security Policy
**Vulnerability:** Lack of Content Security Policy (CSP) headers or meta tags, allowing potential execution of unauthorized scripts and loading of malicious resources.
**Learning:** Even with client-side escaping, a robust CSP is a critical defense-in-depth layer against XSS and data injection. Modern web apps using complex libraries like `transformers.js` (WASM, workers) require careful CSP crafting (`unsafe-eval`, `worker-src`) rather than omitting it entirely.
**Prevention:** Always implement a strict CSP starting with `default-src 'self'` and whitelisting only necessary external resources (CDNs, APIs).
## 2025-07-25 - Content Security Policy (CSP) Implementation Details
**Vulnerability:** Missing Content Security Policy (CSP) leaving the application vulnerable to XSS and unauthorized data exfiltration.
**Learning:** This AI app has specific technical requirements that make a strict CSP challenging:
1. `script-src 'unsafe-eval'` is required by ONNX Runtime Web (`transformers.js`) for WASM execution.
2. `worker-src blob:` is needed for web workers managed by the transformers library.
3. `style-src 'unsafe-inline'` is necessary because `chatInterface.js` injects HTML strings with inline style attributes (e.g., `style="display: none;"`).
4. Multiple external APIs (OpenAI, Aliyun, Baidu, Zhipu, HuggingFace) must be explicitly whitelisted in `connect-src`.
**Prevention:** Implement a tailored CSP that balances security with the app's specific functional needs, restricting all other sources to `self` or trusted CDNs (`cdn.jsdelivr.net`, `cdnjs.cloudflare.com`).
