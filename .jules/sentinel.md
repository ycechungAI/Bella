## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - Content Security Policy for WebAssembly AI Models
**Vulnerability:** Missing Content-Security-Policy (CSP) headers exposed the application to XSS and unauthorized resource loading.
**Learning:** Implementing a strict CSP in an application using `transformers.js` (ONNX Runtime Web) presents unique challenges. The CSP must allow `script-src 'unsafe-eval'` for WASM execution, `worker-src blob:` for web workers, and `connect-src` to specific model hubs (HuggingFace) and CDNs (jsDelivr), while `style-src 'unsafe-inline'` is required due to dynamic UI injection in `chatInterface.js`.
**Prevention:** Future architectural changes or additions to the CSP must preserve these specific permissions (WASM/blob workers/CDNs) without fully opening the policy, ensuring defense-in-depth while maintaining local AI capabilities.
