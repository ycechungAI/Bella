## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - Content Security Policy (CSP) Implementation for AI Models
**Vulnerability:** Missing Content Security Policy (CSP) headers in `index.html` allowing potentially arbitrary scripts, styles, and untrusted domains to execute and interact with the application.
**Learning:** Due to the use of ONNX Runtime Web via `transformers.js`, the CSP must explicitly permit `script-src 'unsafe-eval'` for WASM execution and `worker-src 'self' blob:` for Web Worker initialization. Furthermore, dynamic UI components injecting inline styles necessitate `style-src 'unsafe-inline'`. Cloud API endpoints (OpenAI, Aliyun, Baidu, Zhipu, HuggingFace) must be strictly whitelisted in `connect-src`.
**Prevention:** Always implement a strict CSP that balances the tightest possible security restrictions with the specific execution needs of modern browser-based AI models and dynamic UI frameworks.
