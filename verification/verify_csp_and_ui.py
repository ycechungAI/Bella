from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Enable console logging
        page.on("console", lambda msg: print(f"Console: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"Page Error: {exc}"))

        print("Navigating to http://localhost:8081")
        try:
            page.goto("http://localhost:8081", timeout=10000)
        except Exception:
            page.goto("http://127.0.0.1:8081", timeout=10000)

        # Wait for loading screen to disappear
        print("Waiting for loading screen...")
        page.wait_for_timeout(3000)

        # Check if chat is already visible (script.js might auto-show it)
        print("Checking chat visibility...")
        is_visible = page.locator(".bella-chat-container").is_visible()

        if not is_visible:
            print("Chat not visible. Clicking toggle...")
            chat_btn = page.locator(".bella-chat-toggle")
            if chat_btn.count() > 0:
                chat_btn.click()
            else:
                page.locator("#chat-toggle-btn").click()

            # Wait for chat container
            print("Waiting for chat container...")
            page.wait_for_selector(".bella-chat-container.visible", timeout=5000)
        else:
            print("Chat already visible.")

        print("Chat container visible.")

        # Open settings
        print("Opening settings...")
        settings_btn = page.locator(".bella-settings-btn")
        settings_btn.click()

        # Check settings panel
        print("Waiting for settings panel...")
        page.wait_for_selector(".bella-settings-panel.visible", timeout=2000)
        print("Settings panel visible.")

        # Check if API key group is hidden
        api_key_group = page.locator(".bella-api-key-group")
        # Use evaluate to check style.display
        display_val = api_key_group.evaluate("element => element.style.display")
        print(f"API key group display style: '{display_val}'")

        # Also check if it's effectively hidden (bounding box)
        is_hidden_playwright = not api_key_group.is_visible()
        print(f"API key group effectively hidden: {is_hidden_playwright}")

        # Screenshot
        print("Taking screenshot...")
        page.screenshot(path="verification/verification.png")
        print("Screenshot saved.")

        browser.close()

if __name__ == "__main__":
    run()
