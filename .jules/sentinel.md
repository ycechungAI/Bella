## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - False Positives from Hardcoded Secrets
**Vulnerability:** CRITICAL false positive risk in `cloudAPI.js` where placeholder API keys (like `'Bearer YOUR_OPENAI_API_KEY'`) were hardcoded in the `Authorization` header configurations and explicitly checked for in `isConfigured()`.
**Learning:** Hardcoded strings that resemble secrets (even if they are just placeholders) can trigger false positives in automated secret scanning tools, leading to alert fatigue and potentially masking real vulnerabilities. Furthermore, explicit string comparisons against these placeholders are brittle.
**Prevention:** Avoid hardcoding placeholder secrets in configuration objects. Instead, initialize configuration objects without the sensitive keys or headers entirely, and check for the presence or truthiness of the key/header at runtime.
