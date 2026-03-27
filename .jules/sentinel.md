## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - CSP Configuration for Local AI Models
**Vulnerability:** Missing Content-Security-Policy allowed potential XSS to execute external scripts or exfiltrate data.
**Learning:** Implementing CSP in a WebAssembly/Local AI application (like one using ONNX runtime) requires specific allowances: `worker-src blob:` and `script-src 'unsafe-eval'`. It also requires whitelisting specific CDN and API domains (like huggingface.co, openai.com) for functionality.
**Prevention:** Always implement a strict CSP that uses least privilege. Specifically document required exceptions like `unsafe-eval` when WebAssembly or dynamic code generation requires them to prevent them being removed by accident during audits.
