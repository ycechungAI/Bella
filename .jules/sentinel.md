## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - Content Security Policy (CSP) for AI Apps
**Vulnerability:** Missing CSP allows arbitrary script execution and data exfiltration via XSS.
**Learning:** Frontend-heavy AI apps require specific CSP configurations: `connect-src` must whitelist all AI service providers (OpenAI, HuggingFace, etc.), and `wasm-unsafe-eval` is necessary for local model execution (ONNX Runtime via transformers.js).
**Prevention:** Implement a strict CSP that whitelists only necessary API endpoints and script sources, blocking unauthorized external connections and inline scripts where possible.
