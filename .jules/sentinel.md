## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - AI Web App Content Security Policy
**Vulnerability:** Missing Content Security Policy (CSP) allowed potentially untrusted domains to load scripts, styles, and make connections, exposing the application to XSS and data exfiltration.
**Learning:** Implementing CSP in an AI-driven web app using Transformers.js requires specific configurations: `'unsafe-eval'` is needed for ONNX Runtime WASM execution, `worker-src blob:` for local models in web workers, and `style-src 'unsafe-inline'` for dynamically injected UI components.
**Prevention:** Implement a strict CSP from the start that explicitly whitelists only necessary CDNs (e.g., `cdn.jsdelivr.net`), API endpoints (e.g., OpenAI, HuggingFace), and allows required WASM/blob execution paths without opening the policy entirely.
