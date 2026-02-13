## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - Client-Side AI CSP Requirements
**Vulnerability:** Lack of Content Security Policy (CSP) allowing potential XSS or data exfiltration.
**Learning:** Client-side AI libraries like `transformers.js` (ONNX Runtime Web) require `unsafe-eval` for WASM execution and `blob:` for Web Workers. They also fetch models from `huggingface.co` and runtime files from `cdn.jsdelivr.net`.
**Prevention:** Use a tailored CSP that permits these specific sources while restricting others, rather than disabling CSP or using `unsafe-inline` everywhere.
