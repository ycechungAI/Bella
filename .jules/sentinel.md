## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - Content Security Policy (CSP) for External AI/CDN Integrations
**Vulnerability:** Missing Content Security Policy (CSP) in `index.html` and `test-chat.html` allowed unrestricted resource loading and execution, making the app highly susceptible to XSS.
**Learning:** For frontend applications heavily relying on external AI services (like OpenAI, Aliyun, Baidu) and CDNs for ML models (like HuggingFace and ONNX WASM runtimes via jsdelivr), defining a strict CSP requires carefully balancing security and functionality. For instance, WebAssembly execution often necessitates `unsafe-eval` in `script-src` and worker instantiation requires `blob:`.
**Prevention:** Implement a default-deny CSP using `meta http-equiv` and explicitly whitelist required domains and necessary capabilities. The policy must cover `script-src`, `connect-src` (for API endpoints), `worker-src`, and `media-src`.
