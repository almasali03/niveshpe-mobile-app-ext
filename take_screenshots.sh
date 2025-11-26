#!/bin/bash

# Screenshot capture script for NiveshPe mobile app prototype
# Captures screenshots at 390px width without mobile frame

echo "📱 Taking screenshots of NiveshPe mobile app prototype..."

# Get current directory
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

# Create screenshots directory
mkdir -p screenshots
cd screenshots

# Function to take screenshot
take_screenshot() {
    local page_name="$1"
    local file_name="$2"
    local full_path="file://$DIR/$file_name"
    
    echo "📸 Capturing $page_name..."
    
    # Use Chrome to take screenshot with mobile dimensions
    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
        --headless \
        --disable-gpu \
        --window-size=390,800 \
        --device-scale-factor=2 \
        --screenshot="$page_name.png" \
        "$full_path" 2>/dev/null
    
    if [ -f "$page_name.png" ]; then
        echo "✅ $page_name screenshot saved"
    else
        echo "❌ Failed to capture $page_name"
    fi
    
    # Small delay between screenshots
    sleep 1
}

# Take screenshots of all pages
take_screenshot "home" "index.html"
take_screenshot "add_funds" "add-funds.html" 
take_screenshot "upi_autopay" "upi-autopay.html"
take_screenshot "success" "autopay-success.html"

echo ""
echo "🎉 Screenshot capture complete!"
echo "📁 Screenshots saved in: $DIR/screenshots/"
echo ""
echo "Files created:"
ls -la *.png 2>/dev/null || echo "No screenshots found - check if Chrome is installed"