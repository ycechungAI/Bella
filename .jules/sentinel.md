## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - Missing Content Security Policy
**Vulnerability:** The web application lacked a Content Security Policy (CSP), leaving it susceptible to Cross-Site Scripting (XSS) and other code injection attacks.
**Learning:** Even with careful input escaping, relying solely on code-level sanitization is insufficient. A defense-in-depth strategy requires platform-level protections like CSP to restrict the sources of executable scripts and mitigate the impact of any undiscovered injection flaws.
**Prevention:** Always define a strict CSP using a `<meta http-equiv="Content-Security-Policy">` tag or HTTP headers to explicitly whitelist allowed sources for scripts, styles, and external connections.
