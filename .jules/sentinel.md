## 2024-05-23 - Custom Message Formatting XSS
**Vulnerability:** XSS vulnerability in `chatInterface.js`'s `formatMessage` function where user input was inserted into `innerHTML` without proper escaping.
**Learning:** The custom formatting logic blindly replaced markdown syntax but failed to escape HTML characters first, assuming the input was safe or that replacements were sufficient.
**Prevention:** Always escape HTML entities in user input *before* applying any custom formatting or inserting into the DOM. Use `textContent` when possible, or a dedicated sanitization library.

## 2025-02-18 - Phantom Security Controls
**Vulnerability:** The application featured a "secure" settings panel with a password field for API keys, but the event handlers were never connected to the backend logic.
**Learning:** Security controls that exist in the UI but are not functional create a false sense of security and force users into insecure patterns (like hardcoding secrets in source files).
**Prevention:** Always verify that security features (like credential management) are end-to-end functional. A broken security feature is often worse than a missing one because it misleads the user.
