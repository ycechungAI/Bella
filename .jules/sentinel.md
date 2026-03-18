## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2026-03-18 - CSP Requirements for ONNX Runtime Web
**Vulnerability:** Missing Content Security Policy (CSP) allowed potentially untrusted external scripts/data to run and made the app vulnerable to further injection attacks.
**Learning:** Adding a basic CSP broke the application because `transformers.js` relies on ONNX Runtime WebAssembly, which requires `script-src 'unsafe-eval'` for WASM execution and `worker-src blob:` for its web workers. Dynamic styles injected by `chatInterface.js` also need `style-src 'unsafe-inline'`. Cloud APIs (OpenAI, Qwen, Ernie, GLM) required whitelisting their respective domains in `connect-src`.
**Prevention:** When enforcing CSP on a client-side AI app using WASM, carefully balance security with functionality. Use a strict default policy, but whitelist `unsafe-eval` specifically for the script context that runs WASM, and explicitly map all required API endpoints.
