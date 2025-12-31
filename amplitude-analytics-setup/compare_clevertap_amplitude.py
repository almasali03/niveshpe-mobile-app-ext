#!/usr/bin/env python3
"""
Compare CleverTap vs Amplitude event formats
"""

import pandas as pd
import json

# Read the CleverTap format Excel file
def analyze_clevertap_format():
    try:
        # Read the Excel file
        df = pd.read_excel('/Users/almas/Desktop/NiveshPe/App-related/amplitude-analytics-setup/Book2.xlsx')
        
        print("=" * 80)
        print("CLEVERTAP FORMAT ANALYSIS")
        print("=" * 80)
        
        # Display column names
        print("\nColumns in CleverTap sheet:")
        print(df.columns.tolist())
        
        # Display first few rows to understand structure
        print("\nFirst 5 rows of data:")
        print(df.head().to_string())
        
        # Display data types
        print("\nData types:")
        print(df.dtypes)
        
        # Display unique values in key columns if they exist
        if 'Event Name' in df.columns:
            print(f"\nNumber of unique events: {df['Event Name'].nunique()}")
            print("\nSample events:")
            print(df['Event Name'].head(10).tolist())
        
        # Save a sample to compare
        sample_data = df.head(10).to_dict('records')
        
        print("\n" + "=" * 80)
        print("CLEVERTAP VS AMPLITUDE FORMAT COMPARISON")
        print("=" * 80)
        
        comparison = """
        
CLEVERTAP FORMAT (from your sheet):
------------------------------------
Based on the Excel file structure, CleverTap typically uses:

1. EVENT NAMING:
   - Format: Often uses spaces and title case (e.g., "User Login", "Product Viewed")
   - Convention: More human-readable names
   
2. EVENT PROPERTIES:
   - Format: Properties as separate columns or JSON-like structure
   - Types: String, Number, Date, Boolean
   - Naming: Often uses camelCase or Title Case

3. USER PROPERTIES:
   - Profile attributes updated separately
   - Persistent across sessions
   - Examples: Name, Email, Phone, Customer Type

4. STRUCTURE:
   - Event Name | Event Properties | User Properties | Timestamp
   - Properties often in nested JSON format


AMPLITUDE FORMAT (recommended):
--------------------------------

1. EVENT NAMING:
   - Format: snake_case lowercase (e.g., "user_login", "product_viewed")
   - Convention: Consistent, programmatic naming
   - Best Practice: verb_noun pattern (e.g., "completed_purchase", "viewed_screen")
   
2. EVENT PROPERTIES:
   - Format: Flat JSON structure preferred
   - Types: String, Number, Boolean, Array, Object
   - Naming: Always snake_case (e.g., "product_id", "purchase_amount")
   - Limits: Max 1000 unique values per property

3. USER PROPERTIES:
   - Set once, persist until changed
   - Prefixed with user_ for clarity
   - Examples: user_type, total_invested, kyc_status

4. STRUCTURE:
   - Event Name | Event Properties | User Properties | Revenue Data | Session Info
   - Automatic enrichment with device/location data

KEY DIFFERENCES:
----------------

1. NAMING CONVENTIONS:
   CleverTap: "App Opened" or "App_Opened"
   Amplitude: "app_opened"

2. PROPERTY STRUCTURE:
   CleverTap: { "Product": { "Name": "Fund A", "Category": "Equity" } }
   Amplitude: { "product_name": "Fund A", "product_category": "Equity" }

3. USER IDENTIFICATION:
   CleverTap: Uses Identity/Profile ID
   Amplitude: Uses setUserId() with unique identifier

4. REVENUE TRACKING:
   CleverTap: Charged event with specific structure
   Amplitude: Dedicated Revenue API with price, quantity, product

5. SESSION HANDLING:
   CleverTap: Automatic session tracking
   Amplitude: Manual session_id if needed, automatic by default

6. EVENT LIMITS:
   CleverTap: Flexible property values
   Amplitude: Max 1000 unique values per event property

CONVERSION EXAMPLE:
------------------

CLEVERTAP EVENT:
{
  "Event": "Investment Completed",
  "Properties": {
    "Fund Name": "Axis Bluechip Fund",
    "Amount": 5000,
    "Type": "SIP",
    "Payment Method": "UPI"
  }
}

AMPLITUDE EVENT:
{
  "event_type": "investment_completed",
  "event_properties": {
    "fund_name": "Axis Bluechip Fund",
    "amount": 5000,
    "investment_type": "sip",
    "payment_method": "upi"
  },
  "revenue": 5000,
  "productId": "sip_investment"
}
        """
        
        print(comparison)
        
        # Generate conversion mapping
        print("\n" + "=" * 80)
        print("SUGGESTED CONVERSION MAPPING")
        print("=" * 80)
        
        if 'Event Name' in df.columns:
            print("\nCleverTap Event -> Amplitude Event:")
            for event in df['Event Name'].dropna().unique()[:10]:
                # Convert to Amplitude format
                amplitude_event = event.lower().replace(' ', '_').replace('-', '_')
                print(f"  '{event}' -> '{amplitude_event}'")
        
        return df
        
    except Exception as e:
        print(f"Error reading Excel file: {e}")
        return None

if __name__ == '__main__':
    df = analyze_clevertap_format()
    
    if df is not None:
        # Create a conversion template
        print("\n" + "=" * 80)
        print("AMPLITUDE FORMAT TEMPLATE")
        print("=" * 80)
        
        template = """
Event Category | Event Name | Event Description | Event Properties | Property Type | Property Description | Priority | Implementation Location

Example rows for NiveshPe:

Authentication | phone_number_entered | User enters phone for login | page_source, entry_point | String | Source of login attempt | Critical | AuthScreen.js
Authentication | otp_verified | OTP successfully verified | attempts, phone_masked | Integer, String | Verification details | Critical | OTPScreen.js
Investment | fund_selected | User selects fund | fund_name, fund_category, expected_returns | String, String, Float | Fund details | Critical | FundDetailScreen.js
Investment | investment_completed | Investment successful | amount, fund_name, payment_method | Float, String, String | Transaction details | Critical | PaymentSuccessScreen.js
        """
        
        print(template)
        
        print("\n✅ Analysis complete! Check the output above for format differences.")