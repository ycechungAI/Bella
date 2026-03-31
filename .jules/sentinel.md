## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - Missing Content Security Policy
**Vulnerability:** The web application lacked a Content Security Policy (CSP), leaving it susceptible to Cross-Site Scripting (XSS) and other code injection attacks.
**Learning:** Even with careful input escaping, relying solely on code-level sanitization is insufficient. A defense-in-depth strategy requires platform-level protections like CSP to restrict the sources of executable scripts and mitigate the impact of any undiscovered injection flaws.
**Prevention:** Always define a strict CSP using a `<meta http-equiv="Content-Security-Policy">` tag or HTTP headers to explicitly whitelist allowed sources for scripts, styles, and external connections.
## 2026-03-18 - CSP Requirements for ONNX Runtime Web
**Vulnerability:** Missing Content Security Policy (CSP) allowed potentially untrusted external scripts/data to run and made the app vulnerable to further injection attacks.
**Learning:** Adding a basic CSP broke the application because `transformers.js` relies on ONNX Runtime WebAssembly, which requires `script-src 'unsafe-eval'` for WASM execution and `worker-src blob:` for its web workers. Dynamic styles injected by `chatInterface.js` also need `style-src 'unsafe-inline'`. Cloud APIs (OpenAI, Qwen, Ernie, GLM) required whitelisting their respective domains in `connect-src`.
**Prevention:** When enforcing CSP on a client-side AI app using WASM, carefully balance security with functionality. Use a strict default policy, but whitelist `unsafe-eval` specifically for the script context that runs WASM, and explicitly map all required API endpoints.
## 2025-03-15 - Content Security Policy (CSP) Implementation
**Vulnerability:** The application lacked a Content Security Policy (CSP), making it vulnerable to XSS and data exfiltration, especially given the dynamic creation of UI elements using `innerHTML` and loading models/scripts from CDNs.
**Learning:** Due to the application's reliance on ONNX Runtime WebAssembly execution and dynamic UI styling, a strict CSP required specific allowances: `script-src 'unsafe-eval'` for WASM, `style-src 'unsafe-inline'` for dynamically injected styles in `chatInterface.js`, and `worker-src blob:` / `connect-src blob:` to support local model execution and web workers.
**Prevention:** Implement a strict CSP that uses the principle of least privilege, explicitly whitelisting only necessary domains (like `cdn.jsdelivr.net`, `cdnjs.cloudflare.com`, and cloud AI provider APIs) and avoiding overly permissive directives like `default-src *`.
## 2024-05-24 - Missing Content Security Policy
**Vulnerability:** Lack of Content Security Policy (CSP) allowed potentially untrusted scripts to be executed, inline scripts/styles, and unverified external resources.
**Learning:** Modern web apps with dynamic UI generation require explicitly defined CSPs. `script-src 'unsafe-eval'` was necessary due to transformers.js and `style-src 'unsafe-inline'` due to dynamic UI element visibility toggles (e.g. `style="display: none;"`).
**Prevention:** Always implement a strict CSP via meta tag or HTTP headers, whitelisting specific origins (like `cdn.jsdelivr.net` for libraries) and `blob:` for workers and media when necessary, rather than allowing `*`.
## 2024-05-24 - AI Web App Content Security Policy
**Vulnerability:** Missing Content Security Policy (CSP) allowed potentially untrusted domains to load scripts, styles, and make connections, exposing the application to XSS and data exfiltration.
**Learning:** Implementing CSP in an AI-driven web app using Transformers.js requires specific configurations: `'unsafe-eval'` is needed for ONNX Runtime WASM execution, `worker-src blob:` for local models in web workers, and `style-src 'unsafe-inline'` for dynamically injected UI components.
**Prevention:** Implement a strict CSP from the start that explicitly whitelists only necessary CDNs (e.g., `cdn.jsdelivr.net`), API endpoints (e.g., OpenAI, HuggingFace), and allows required WASM/blob execution paths without opening the policy entirely.
## 2024-05-24 - Content Security Policy (CSP) Implementation for AI Models
**Vulnerability:** Missing Content Security Policy (CSP) headers in `index.html` allowing potentially arbitrary scripts, styles, and untrusted domains to execute and interact with the application.
**Learning:** Due to the use of ONNX Runtime Web via `transformers.js`, the CSP must explicitly permit `script-src 'unsafe-eval'` for WASM execution and `worker-src 'self' blob:` for Web Worker initialization. Furthermore, dynamic UI components injecting inline styles necessitate `style-src 'unsafe-inline'`. Cloud API endpoints (OpenAI, Aliyun, Baidu, Zhipu, HuggingFace) must be strictly whitelisted in `connect-src`.
**Prevention:** Always implement a strict CSP that balances the tightest possible security restrictions with the specific execution needs of modern browser-based AI models and dynamic UI frameworks.
## 2025-02-23 - Missing Content Security Policy
**Vulnerability:** Lack of Content Security Policy (CSP) headers or meta tags, allowing potential execution of unauthorized scripts and loading of malicious resources.
**Learning:** Even with client-side escaping, a robust CSP is a critical defense-in-depth layer against XSS and data injection. Modern web apps using complex libraries like `transformers.js` (WASM, workers) require careful CSP crafting (`unsafe-eval`, `worker-src`) rather than omitting it entirely.
**Prevention:** Always implement a strict CSP starting with `default-src 'self'` and whitelisting only necessary external resources (CDNs, APIs).
## 2025-07-25 - Content Security Policy (CSP) Implementation Details
**Vulnerability:** Missing Content Security Policy (CSP) leaving the application vulnerable to XSS and unauthorized data exfiltration.
**Learning:** This AI app has specific technical requirements that make a strict CSP challenging:
1. `script-src 'unsafe-eval'` is required by ONNX Runtime Web (`transformers.js`) for WASM execution.
2. `worker-src blob:` is needed for web workers managed by the transformers library.
3. `style-src 'unsafe-inline'` is necessary because `chatInterface.js` injects HTML strings with inline style attributes (e.g., `style="display: none;"`).
4. Multiple external APIs (OpenAI, Aliyun, Baidu, Zhipu, HuggingFace) must be explicitly whitelisted in `connect-src`.
**Prevention:** Implement a tailored CSP that balances security with the app's specific functional needs, restricting all other sources to `self` or trusted CDNs (`cdn.jsdelivr.net`, `cdnjs.cloudflare.com`).
