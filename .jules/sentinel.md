## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2024-05-24 - Placeholder Secrets Flagged by Scanners
**Vulnerability:** Placeholder API keys (e.g., 'YOUR_OPENAI_API_KEY') hardcoded in `cloudAPI.js` configuration objects can trigger false positives in automated secret scanning tools, leading to alert fatigue or potentially masking real leaked secrets.
**Learning:** Even obviously fake or placeholder secrets in source code are a bad practice as they unnecessarily trip up static analysis and security scanning tools.
**Prevention:** Remove placeholder strings from default configuration blocks. Instead, initialize the objects without the sensitive headers/keys, and only dynamically add the headers (like `Authorization`) when a user actually provides a valid key (e.g., in a `setAPIKey` method).
