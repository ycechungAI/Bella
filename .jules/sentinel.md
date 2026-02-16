## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - Client-Side AI API Architecture & CSP
**Vulnerability:** Lack of Content Security Policy allowing unrestricted network access and script execution.
**Learning:** The application architecture (client-side orchestration of multiple AI providers) requires an unusually permissive `connect-src` policy (OpenAI, Aliyun, Baidu, Zhipu, HuggingFace) and `script-src` (`unsafe-eval` for WASM).
**Prevention:** When implementing CSP for client-side AI apps, carefully audit all provider endpoints and WASM requirements (transformers.js) to balance security with functionality.
