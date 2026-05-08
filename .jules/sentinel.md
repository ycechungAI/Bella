## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - Placeholder Secrets Flagged by Scanners
**Vulnerability:** Placeholder API keys (e.g., 'YOUR_OPENAI_API_KEY') hardcoded in `cloudAPI.js` configuration objects can trigger false positives in automated secret scanning tools, leading to alert fatigue or potentially masking real leaked secrets.
**Learning:** Even obviously fake or placeholder secrets in source code are a bad practice as they unnecessarily trip up static analysis and security scanning tools.
**Prevention:** Remove placeholder strings from default configuration blocks. Instead, initialize the objects without the sensitive headers/keys, and only dynamically add the headers (like `Authorization`) when a user actually provides a valid key (e.g., in a `setAPIKey` method).
## 2024-05-24 - False Positives from Hardcoded Secrets
**Vulnerability:** CRITICAL false positive risk in `cloudAPI.js` where placeholder API keys (like `'Bearer YOUR_OPENAI_API_KEY'`) were hardcoded in the `Authorization` header configurations and explicitly checked for in `isConfigured()`.
**Learning:** Hardcoded strings that resemble secrets (even if they are just placeholders) can trigger false positives in automated secret scanning tools, leading to alert fatigue and potentially masking real vulnerabilities. Furthermore, explicit string comparisons against these placeholders are brittle.
**Prevention:** Avoid hardcoding placeholder secrets in configuration objects. Instead, initialize configuration objects without the sensitive keys or headers entirely, and check for the presence or truthiness of the key/header at runtime.
## 2026-03-10 - Hardcoded Secret Placeholders
**Vulnerability:** Placeholder API keys (e.g., `YOUR_OPENAI_API_KEY`) were hardcoded in `cloudAPI.js` configuration objects, leading to false positive triggers in automated secret scanners.
**Learning:** Hardcoding even dummy secret patterns or placeholder keys can cause security tools to flag the codebase incorrectly, creating unnecessary noise and potential alert fatigue.
**Prevention:** Avoid defining placeholder strings for sensitive fields in codebase configurations. Instead, omit the field, conditionally set headers based on variables, or construct them dynamically at runtime.
## 2024-05-24 - Missing Content Security Policy (CSP)
**Vulnerability:** The application lacked a Content Security Policy (CSP), leaving it vulnerable to Cross-Site Scripting (XSS) and unauthorized resource loading. Since the application handles user input and connects to various external AI APIs, it's a high-priority risk.
**Learning:** Even static applications or vanilla JS projects need a robust CSP. Without it, if an XSS vulnerability occurs (like the custom message formatting issue previously patched), attackers can execute malicious scripts or exfiltrate data to arbitrary domains.
**Prevention:** Always define a strict CSP as a defense-in-depth baseline. The CSP should whitelist only necessary sources for scripts (e.g., `cdn.jsdelivr.net`), styles, connections (e.g., OpenAI, Aliyun, Baidu, Zhipu, HuggingFace), and media/workers.
## 2024-05-24 - CSP Configuration for Transformers.js
**Vulnerability:** Missing Content Security Policy allowed potential XSS and data exfiltration.
**Learning:** `transformers.js` (via ONNX Runtime Web) requires `script-src 'unsafe-eval'` for WASM compilation and `worker-src blob:` for web workers, which must be explicitly allowed in the CSP. Standard strict CSPs break this functionality.
**Prevention:** When using client-side AI libraries like ONNX Runtime, ensure the CSP accommodates WASM execution requirements while maintaining strictness elsewhere.
## 2024-05-24 - Fake Secrets in Code
**Vulnerability:** Hardcoding placeholder secrets (e.g., `YOUR_OPENAI_API_KEY`) triggers secret scanners and causes false positives.
**Learning:** Default configurations in API services shouldn't contain placeholder strings that mimic the format or naming conventions of real API keys, as they cause unnecessary security alerts.
**Prevention:** Omit the header keys that contain secrets by default and add them dynamically when checking/saving user credentials. Also implemented a strong Content-Security-Policy to protect against XSS and control where the app can connect to, which is critical for web-based LLM apps.
## 2024-05-23 - Content Security Policy for AI Applications
**Vulnerability:** Missing Content Security Policy (CSP), allowing potential execution of unauthorized scripts, loading of arbitrary resources, or data exfiltration (XSS and broader injection risks).
**Learning:** Adding a CSP to a client-side AI application (like one using ONNX Runtime Web via `transformers.js`) requires unique configurations. Specifically, WebAssembly compilation requires `script-src 'unsafe-eval'`, and `transformers.js` relies on Web Workers loaded via `blob:` URLs (`worker-src blob:`). Furthermore, connections to diverse Cloud AI APIs (OpenAI, Qwen, Ernie, GLM) must be explicitly whitelisted in `connect-src`.
**Prevention:** Always implement a strict `Content-Security-Policy` header or `<meta>` tag. When using WebAssembly-based AI libraries, explicitly document and allow `unsafe-eval` and `blob:` sources to balance security with functional requirements.
## 2024-05-24 - Content Security Policy (CSP) for External AI/CDN Integrations
**Vulnerability:** Missing Content Security Policy (CSP) in `index.html` and `test-chat.html` allowed unrestricted resource loading and execution, making the app highly susceptible to XSS.
**Learning:** For frontend applications heavily relying on external AI services (like OpenAI, Aliyun, Baidu) and CDNs for ML models (like HuggingFace and ONNX WASM runtimes via jsdelivr), defining a strict CSP requires carefully balancing security and functionality. For instance, WebAssembly execution often necessitates `unsafe-eval` in `script-src` and worker instantiation requires `blob:`.
**Prevention:** Implement a default-deny CSP using `meta http-equiv` and explicitly whitelist required domains and necessary capabilities. The policy must cover `script-src`, `connect-src` (for API endpoints), `worker-src`, and `media-src`.
## 2024-05-23 - CSP Requirements for WebAssembly & Dynamic UIs
**Vulnerability:** Missing Content Security Policy (CSP) allowed potential execution of unauthorized scripts, framing of the site, and connections to arbitrary domains, increasing the risk of XSS and data exfiltration.
**Learning:** Implementing CSP in an application using `transformers.js` (ONNX Runtime Web) requires `'unsafe-eval'` for WASM execution and `worker-src blob:` for web workers. Additionally, custom chat UIs building DOM elements with inline styles necessitate `'unsafe-inline'` for `style-src`.
**Prevention:** Apply a strict CSP while carefully whitelisting only the necessary CDNs (jsdelivr, cloudflare), API endpoints (OpenAI, HuggingFace, etc.), and specific execution contexts required by underlying libraries, re-evaluating these needs periodically.
## 2025-02-13 - CSP Allowances for AI Architecture
**Vulnerability:** Missing Content Security Policy (CSP) headers leaving the application vulnerable to XSS and data injection attacks.
**Learning:** Adding a CSP to an AI-driven Web UI requires specific allowances for WASM models (transformers.js): `unsafe-eval` for scripts, `worker-src blob:` for workers, `style-src 'unsafe-inline'` for dynamically generated component styles, and broad external API whitelists for OpenAI, Alibaba, Baidu, HuggingFace, etc. Strict zero-trust policies block core functionality if not carefully crafted.
**Prevention:** Implement strict CSP headers via `<meta>` tags or server-side responses early in development, ensuring required external endpoints (HF, Cloud APIs) and capabilities (blob workers, eval) are explicitly modeled into the policy architecture.
## 2024-05-24 - CSP Configuration for Local AI Models
**Vulnerability:** Missing Content-Security-Policy allowed potential XSS to execute external scripts or exfiltrate data.
**Learning:** Implementing CSP in a WebAssembly/Local AI application (like one using ONNX runtime) requires specific allowances: `worker-src blob:` and `script-src 'unsafe-eval'`. It also requires whitelisting specific CDN and API domains (like huggingface.co, openai.com) for functionality.
**Prevention:** Always implement a strict CSP that uses least privilege. Specifically document required exceptions like `unsafe-eval` when WebAssembly or dynamic code generation requires them to prevent them being removed by accident during audits.
## 2025-07-28 - Strict Content Security Policy implementation
**Vulnerability:** A missing Content Security Policy enabled potential attacks like XSS by executing malicious scripts loaded from external sources or inline.
**Learning:** Enforcing a CSP while utilizing dynamic WASM execution and blob workers via `transformers.js` demands the specific inclusion of `script-src 'unsafe-eval'` and `worker-src blob:`. Similarly, UI components that dynamically append unverified inline HTML to style rules require `style-src 'unsafe-inline'`.
**Prevention:** Always deploy a CSP via `meta` tags or HTTP headers that narrowly allows required third-party APIs (`api.openai.com`, etc.), whitelists internal paths, and blocks arbitrary resources.
## 2024-05-24 - Content Security Policy for WebAssembly AI Models
**Vulnerability:** Missing Content-Security-Policy (CSP) headers exposed the application to XSS and unauthorized resource loading.
**Learning:** Implementing a strict CSP in an application using `transformers.js` (ONNX Runtime Web) presents unique challenges. The CSP must allow `script-src 'unsafe-eval'` for WASM execution, `worker-src blob:` for web workers, and `connect-src` to specific model hubs (HuggingFace) and CDNs (jsDelivr), while `style-src 'unsafe-inline'` is required due to dynamic UI injection in `chatInterface.js`.
**Prevention:** Future architectural changes or additions to the CSP must preserve these specific permissions (WASM/blob workers/CDNs) without fully opening the policy, ensuring defense-in-depth while maintaining local AI capabilities.
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
## 2024-05-24 - Missing Timeout on External API Calls
**Vulnerability:** External API calls to Cloud AI providers (OpenAI, Qwen, Ernie, GLM) lacked timeout configurations, potentially leading to hanging connections, resource exhaustion, and Denial of Service (DoS) for the client application.
**Learning:** Default `fetch` calls in JavaScript do not have a timeout. When integrating with third-party services, especially generative AI APIs which can be slow or unresponsive, relying on the browser's default timeout (which can be several minutes) is dangerous and can block application flow or UI updates.
**Prevention:** Always wrap external API calls with a timeout mechanism. In modern JavaScript, use `AbortController` combined with `setTimeout` to enforce a strict upper bound (e.g., 10 seconds) on how long the application will wait for a response.

## 2026-04-03 - Missing Timeout on External API Calls
**Vulnerability:** External API calls to LLM providers (OpenAI, Qwen, Ernie, GLM) were made using native `fetch` without any timeout configuration. This could lead to unhandled hanging connections and resource exhaustion (client-side DoS) if the remote server is unresponsive or the network is unstable.
**Learning:** The native `fetch` API does not have a default timeout. In AI applications where API generation times can vary significantly or connections can hang, relying on the browser's default timeout (which can be several minutes) severely degrades user experience and ties up resources.
**Prevention:** Always implement an `AbortController` wrapper for `fetch` calls to enforce a strict timeout (e.g., 10 seconds), ensuring the application can gracefully recover or inform the user of network issues.
## 2024-05-25 - XSS via Inline Scripts in CSP
**Vulnerability:** The Content Security Policy (CSP) for `test-chat.html` contained `script-src 'unsafe-inline'`, which effectively neutralized the policy's protection against Cross-Site Scripting (XSS) attacks by allowing arbitrary inline scripts to execute.
**Learning:** Even in test files or auxiliary pages, using `'unsafe-inline'` in a CSP significantly degrades the application's overall security posture. Inline scripts and inline event handlers (like `onclick`) should be avoided.
**Prevention:** Extracted the inline `<script type="module">` and inline event handlers from `test-chat.html` into a separate external file (`testChat.js`). This allowed the removal of `'unsafe-inline'` from the `script-src` directive, strictly enforcing a safer policy.

## 2024-05-25 - Missing Logic-Level Input Length Validation
**Vulnerability:** The HTML input field for chat messages (`<input type="text" maxlength="500">`) relied solely on client-side HTML validation. The `sendMessage()` JavaScript function lacked logic-level length checks, allowing attackers to bypass the UI constraint (e.g. via browser dev tools) and send excessively large payloads, potentially causing a client-side Denial of Service (DoS) or performance degradation in UI rendering.
**Learning:** Relying exclusively on HTML attributes like `maxlength` is insufficient for security. Attackers can easily modify the DOM to remove these attributes. Critical constraints must be enforced at the JavaScript logic level before processing or transmitting data.
**Prevention:** Implement a hard truncation or validation step (e.g., `text = text.substring(0, 500)`) in the data handling logic (`sendMessage()`) to ensure payloads never exceed the expected maximum size, regardless of how they were submitted from the UI.
