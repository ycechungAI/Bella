## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - Missing Content Security Policy (CSP)
**Vulnerability:** The application lacked a Content Security Policy (CSP), leaving it vulnerable to Cross-Site Scripting (XSS) and unauthorized resource loading. Since the application handles user input and connects to various external AI APIs, it's a high-priority risk.
**Learning:** Even static applications or vanilla JS projects need a robust CSP. Without it, if an XSS vulnerability occurs (like the custom message formatting issue previously patched), attackers can execute malicious scripts or exfiltrate data to arbitrary domains.
**Prevention:** Always define a strict CSP as a defense-in-depth baseline. The CSP should whitelist only necessary sources for scripts (e.g., `cdn.jsdelivr.net`), styles, connections (e.g., OpenAI, Aliyun, Baidu, Zhipu, HuggingFace), and media/workers.
