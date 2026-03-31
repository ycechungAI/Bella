from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Capture console messages to check for CSP violations
        csp_violations = []
        page.on("console", lambda msg: csp_violations.append(msg.text) if "Content-Security-Policy" in msg.text or "CSP" in msg.text else None)

        try:
            page.goto("http://localhost:8081", timeout=5000)
            page.wait_for_timeout(2000) # Wait a bit for async stuff to load

            if csp_violations:
                print("CSP Violations Found:")
                for violation in csp_violations:
                    print(f"- {violation}")
            else:
                print("No CSP violations detected on the main page.")

            page.goto("http://localhost:8081/test-chat.html", timeout=5000)
            page.wait_for_timeout(2000) # Wait a bit for async stuff to load

            if csp_violations:
                print("CSP Violations Found on test-chat.html:")
                for violation in csp_violations:
                    print(f"- {violation}")
            else:
                print("No CSP violations detected on test-chat.html either.")

        except Exception as e:
             print(f"Error accessing page: {e}")

        finally:
            browser.close()

if __name__ == "__main__":
    run()
