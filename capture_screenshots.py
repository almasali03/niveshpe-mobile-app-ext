#!/usr/bin/env python3
"""
Screenshot capture script for NiveshPe mobile app prototype
Captures screenshots of all pages at 390px width without mobile frame
"""

import time
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Setup Chrome options for headless screenshot capture
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--window-size=390,800")  # Mobile width
chrome_options.add_argument("--device-scale-factor=2")  # High DPI

def capture_screenshot(driver, page_name, file_path, wait_for_element=None):
    """Capture screenshot of a page"""
    print(f"Capturing {page_name}...")
    
    # Navigate to page
    driver.get(f"file://{file_path}")
    
    # Wait for page to load
    time.sleep(2)
    
    # Wait for specific element if provided
    if wait_for_element:
        try:
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, wait_for_element))
            )
        except:
            pass
    
    # Get the mobile content element (without the frame)
    try:
        mobile_content = driver.find_element(By.CLASS_NAME, "mobile-content")
        # Scroll to make sure we capture the full content
        driver.execute_script("arguments[0].scrollTop = 0;", mobile_content)
        time.sleep(1)
        
        # Take screenshot of just the mobile content
        mobile_content.screenshot(f"{page_name}_screenshot.png")
        print(f"✓ {page_name} screenshot saved as {page_name}_screenshot.png")
        
    except Exception as e:
        print(f"✗ Error capturing {page_name}: {e}")
        # Fallback to full page screenshot
        driver.save_screenshot(f"{page_name}_screenshot_fallback.png")

def main():
    # Get the current directory
    current_dir = os.getcwd()
    
    # Page configurations
    pages = [
        {
            "name": "home",
            "file": "index.html",
            "wait_element": "hero-card"
        },
        {
            "name": "add_funds", 
            "file": "add-funds.html",
            "wait_element": "amount-input"
        },
        {
            "name": "upi_autopay",
            "file": "upi-autopay.html", 
            "wait_element": "upi-grid"
        },
        {
            "name": "success",
            "file": "autopay-success.html",
            "wait_element": "success-icon"
        }
    ]
    
    # Initialize Chrome driver
    try:
        driver = webdriver.Chrome(options=chrome_options)
        driver.set_window_size(390, 800)
        
        print("Starting screenshot capture...")
        print(f"Working directory: {current_dir}")
        
        # Capture screenshots for each page
        for page in pages:
            file_path = os.path.join(current_dir, page["file"])
            if os.path.exists(file_path):
                capture_screenshot(
                    driver, 
                    page["name"], 
                    file_path, 
                    page["wait_element"]
                )
            else:
                print(f"✗ File not found: {page['file']}")
        
        print("\n✓ All screenshots captured!")
        
    except Exception as e:
        print(f"Error initializing Chrome driver: {e}")
        print("Make sure Chrome and ChromeDriver are installed")
        
    finally:
        try:
            driver.quit()
        except:
            pass

if __name__ == "__main__":
    main()