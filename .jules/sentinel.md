## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-23 - Hybrid AI Architecture CSP Strategy
**Vulnerability:** Absence of Content Security Policy (CSP) in a hybrid AI application, exposing it to XSS and data exfiltration, especially given the mix of local WASM execution and cloud API calls.
**Learning:** Hybrid architectures require a nuanced CSP: `unsafe-eval` is often necessary for client-side model execution (ONNX/WASM), while `connect-src` must whitelist multiple cloud providers (OpenAI, Alibaba, Baidu, Zhipu) alongside local resources. This creates a larger attack surface than a purely local or purely cloud-based app.
**Prevention:** Implement a strict CSP that explicitly whitelists all required API endpoints and local resource types. Use `worker-src` and `script-src` carefully to support WASM without opening the door to arbitrary script execution.
