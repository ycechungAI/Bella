## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-23 - Content Security Policy for AI Applications
**Vulnerability:** Missing Content Security Policy (CSP), allowing potential execution of unauthorized scripts, loading of arbitrary resources, or data exfiltration (XSS and broader injection risks).
**Learning:** Adding a CSP to a client-side AI application (like one using ONNX Runtime Web via `transformers.js`) requires unique configurations. Specifically, WebAssembly compilation requires `script-src 'unsafe-eval'`, and `transformers.js` relies on Web Workers loaded via `blob:` URLs (`worker-src blob:`). Furthermore, connections to diverse Cloud AI APIs (OpenAI, Qwen, Ernie, GLM) must be explicitly whitelisted in `connect-src`.
**Prevention:** Always implement a strict `Content-Security-Policy` header or `<meta>` tag. When using WebAssembly-based AI libraries, explicitly document and allow `unsafe-eval` and `blob:` sources to balance security with functional requirements.
