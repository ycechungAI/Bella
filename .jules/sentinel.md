## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-23 - CSP Requirements for WebAssembly & Dynamic UIs
**Vulnerability:** Missing Content Security Policy (CSP) allowed potential execution of unauthorized scripts, framing of the site, and connections to arbitrary domains, increasing the risk of XSS and data exfiltration.
**Learning:** Implementing CSP in an application using `transformers.js` (ONNX Runtime Web) requires `'unsafe-eval'` for WASM execution and `worker-src blob:` for web workers. Additionally, custom chat UIs building DOM elements with inline styles necessitate `'unsafe-inline'` for `style-src`.
**Prevention:** Apply a strict CSP while carefully whitelisting only the necessary CDNs (jsdelivr, cloudflare), API endpoints (OpenAI, HuggingFace, etc.), and specific execution contexts required by underlying libraries, re-evaluating these needs periodically.
