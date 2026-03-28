## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2025-02-13 - CSP Allowances for AI Architecture
**Vulnerability:** Missing Content Security Policy (CSP) headers leaving the application vulnerable to XSS and data injection attacks.
**Learning:** Adding a CSP to an AI-driven Web UI requires specific allowances for WASM models (transformers.js): `unsafe-eval` for scripts, `worker-src blob:` for workers, `style-src 'unsafe-inline'` for dynamically generated component styles, and broad external API whitelists for OpenAI, Alibaba, Baidu, HuggingFace, etc. Strict zero-trust policies block core functionality if not carefully crafted.
**Prevention:** Implement strict CSP headers via `<meta>` tags or server-side responses early in development, ensuring required external endpoints (HF, Cloud APIs) and capabilities (blob workers, eval) are explicitly modeled into the policy architecture.
