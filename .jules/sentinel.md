## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2026-03-10 - Hardcoded Secret Placeholders
**Vulnerability:** Placeholder API keys (e.g., `YOUR_OPENAI_API_KEY`) were hardcoded in `cloudAPI.js` configuration objects, leading to false positive triggers in automated secret scanners.
**Learning:** Hardcoding even dummy secret patterns or placeholder keys can cause security tools to flag the codebase incorrectly, creating unnecessary noise and potential alert fatigue.
**Prevention:** Avoid defining placeholder strings for sensitive fields in codebase configurations. Instead, omit the field, conditionally set headers based on variables, or construct them dynamically at runtime.
