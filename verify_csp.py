from playwright.sync_api import sync_playwright
import time
import subprocess
import os
import signal

def verify_page(url, page_name):
    print(f"Verifying {page_name}...")
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        errors = []
        page.on("pageerror", lambda err: errors.append(f"JS Error: {err}"))
        def log_console(msg):
            if msg.type == "error":
                errors.append(f"Console error: {msg.text}")
            elif msg.type == "warning":
                 pass

        page.on("console", log_console)

        response = page.goto(url)
        print(f"Response status: {response.status}")

        # Wait a bit for async operations like model loading attempts
        time.sleep(4)

        has_csp_error = any("Content Security Policy" in err or "CSP" in err or "Refused to load" in err or "Refused to evaluate" in err for err in errors)

        print(f"Errors found on {page_name}: {len(errors)}")
        for err in errors:
            print(f"  - {err}")

        if has_csp_error:
            print(f"FAILED: Found CSP violations on {page_name}!")
            return False
        else:
            print(f"SUCCESS: No CSP violations found on {page_name}.")
            return True

if __name__ == "__main__":
    success_index = verify_page("http://localhost:8081/index.html", "index.html")
    success_test = verify_page("http://localhost:8081/test-chat.html", "test-chat.html")

    if success_index and success_test:
        print("\nALL VERIFICATIONS PASSED")
        exit(0)
    else:
        print("\nVERIFICATION FAILED")
        exit(1)
